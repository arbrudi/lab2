from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
from elasticsearch import Elasticsearch
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Text, select
from flask_sqlalchemy import SQLAlchemy
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask application
app = Flask(__name__)

# Database connection string
conn = (
    'mssql+pyodbc:///?odbc_connect='
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-UD05JRG\\MSSQLSERVER01;'
    'DATABASE=lab2;'
    'Trusted_Connection=yes;'
)

app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the app
db = SQLAlchemy(app)

# Enable CORS for all routes
CORS(app)

# Elasticsearch client initialization
es = Elasticsearch(
    [{'host': 'localhost', 'port': 9200}],
    http_auth=('elastic', 'dkjGfNMmL6f6SjdldHc5')
)

# Define Blueprint for search API routes
search_bp = Blueprint('search_bp', __name__)

# Set up CORS for the blueprint
CORS(search_bp)

# Initialize SQLAlchemy engine
engine = create_engine(conn)

# Initialize metadata
metadata = MetaData()

# Define the Events table explicitly
events_table = Table(
    'Events', metadata,
    Column('Event_ID', Integer, primary_key=True, nullable=False),
    Column('Event_title', Text(collation='SQL_Latin1_General_CP1_CI_AS')),
    Column('Event_image', String(255, collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False),
    Column('Event_date', String(255, collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False),
    Column('Event_description', String(255, collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False)
)

# Reflect the metadata with the engine
metadata.create_all(engine)

# Function to fetch event details by ID from MSSQL
def fetch_event_details(event_id):
    try:
        with engine.connect() as connection:
            query = select(
                events_table.c.Event_ID,
                events_table.c.Event_title,
                events_table.c.Event_image,
                events_table.c.Event_date,
                events_table.c.Event_description
            ).where(events_table.c.Event_ID == event_id)

            result = connection.execute(query)
            event = result.fetchone()

            if not event:
                return None
            
            return dict(event)

    except Exception as e:
        logger.error(f"Error fetching event details from MSSQL: {e}")
        return None

# Function to update an event in MSSQL and Elasticsearch
def update_event(event_id, event_data):
    try:
        with engine.connect() as connection:
            update_query = events_table.update().where(events_table.c.Event_ID == event_id).values(**event_data)
            result = connection.execute(update_query)
            if result.rowcount == 0:
                return False

        # Update event in Elasticsearch
        update_event_in_elasticsearch(event_id, event_data)
        return True
    except Exception as e:
        logger.error(f"Error updating event: {e}")
        return False

# Function to update an event in Elasticsearch
def update_event_in_elasticsearch(event_id, event_data):
    try:
        es.update(index="lab2", id=event_id, body={"doc": event_data})
        es.indices.refresh(index="lab2")  # Refresh index after update
        logger.info(f"Updated event with ID {event_id} in Elasticsearch.")
    except Exception as e:
        logger.error(f"Error updating event in Elasticsearch: {e}")

# Function to delete an event from MSSQL and Elasticsearch
def delete_event(event_id):
    try:
        with engine.connect() as connection:
            delete_query = events_table.delete().where(events_table.c.Event_ID == event_id)
            result = connection.execute(delete_query)
            if result.rowcount == 0:
                return False

        # Delete event from Elasticsearch
        delete_event_from_elasticsearch(event_id)
        return True
    except Exception as e:
        logger.error(f"Error deleting event: {e}")
        return False

# Function to delete an event from Elasticsearch
def delete_event_from_elasticsearch(event_id):
    try:
        es.delete(index="lab2", id=event_id)
        es.indices.refresh(index="lab2")  # Refresh index after deletion
        logger.info(f"Deleted event with ID {event_id} from Elasticsearch.")
    except Exception as e:
        logger.error(f"Error deleting event from Elasticsearch: {e}")

# Endpoint to handle event updates from MSSQL
@app.route('/update_event_from_mssql', methods=['POST'])
def update_event_from_mssql():
    try:
        event_data = request.json
        event_id = event_data['Event_ID']

        if update_event(event_id, event_data):
            return jsonify({'success': True})
        else:
            return jsonify({'error': f'Event with ID {event_id} not found or update failed.'}), 404
    except Exception as e:
        logger.error(f"Error updating event from MSSQL: {e}")
        return jsonify({'error': str(e)}), 500

# Function to fetch events from Elasticsearch by title prefix and/or date
def fetch_events(query, date_filter):
    try:
        es_query = {
            'size': 1000,  # Adjust based on your maximum expected results
            'query': {
                'bool': {
                    'must': []
                }
            }
        }

        if query:
            es_query['query']['bool']['must'].append({'prefix': {'Event_title': query}})
        
        if date_filter:
            es_query['query']['bool']['must'].append({'term': {'Event_date': date_filter}})

        res = es.search(index="lab2", body=es_query)
        data = res['hits']['hits']
        events = [{'Event_ID': hit['_id'], **hit['_source']} for hit in data]
        unique_events = {event['Event_ID']: event for event in events}.values()
        
        logger.info(f"Fetched {len(unique_events)} unique events from Elasticsearch with query '{query}' and date '{date_filter}'.")
        return list(unique_events)
    
    except Exception as e:
        logger.error(f"Error fetching events from Elasticsearch: {e}")
        return []

# Search endpoint to handle title and date search
@search_bp.route('/events', methods=['GET'])
def search_events():
    query = request.args.get('query', '').strip().lower()
    date_filter = request.args.get('date', '').strip()

    try:
        events = fetch_events(query, date_filter)
        return jsonify(events)
    
    except Exception as e:
        logger.error(f"Error processing search request: {e}")
        return jsonify({'error': str(e)}), 500

# Detailed event endpoint
@search_bp.route('/event/<int:event_id>', methods=['GET'])
def get_event_details(event_id):
    try:
        event = fetch_event_details(event_id)

        if not event:
            return jsonify({'error': 'Event not found'}), 404

        return jsonify(event)

    except Exception as e:
        logger.error(f"Error fetching event details: {e}")
        return jsonify({'error': str(e)}), 500

# Endpoint to handle event deletion from MSSQL and Elasticsearch
@app.route('/delete_event_from_mssql', methods=['POST'])
def delete_event_from_mssql():
    try:
        event_data = request.json
        event_id = event_data['Event_ID']

        if delete_event(event_id):
            return jsonify({'success': True})
        else:
            return jsonify({'error': f'Event with ID {event_id} not found or deletion failed.'}), 404
    except Exception as e:
        logger.error(f"Error deleting event from MSSQL: {e}")
        return jsonify({'error': str(e)}), 500

# Register Blueprint with Flask application
app.register_blueprint(search_bp, url_prefix='/search')

if __name__ == "__main__":
    app.run(debug=True)
delete_event(9)