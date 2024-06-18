from flask import Flask, Blueprint, jsonify
from elasticsearch import Elasticsearch, helpers
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, Text, String, ForeignKey, select
from extensions import db  # Assuming you have SQLAlchemy db instance imported
import logging

# Initialize Flask app
app = Flask(__name__) 

# Change SERVER
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
db.init_app(app)

# Initialize Elasticsearch client with authentication
es = Elasticsearch([{'host': 'localhost', 'port': 9200}],
                   http_auth=('elastic', 'dkjGfNMmL6f6SjdldHc5'))

# Function to fetch data from MSSQL
def fetch_data_from_mssql():
    try:
        engine = create_engine(conn)
        metadata = MetaData()
        books_table = Table(
            'Books', metadata,
            Column('ISBN', Integer, primary_key=True, nullable=False),
            Column('Book_image', Text(collation='SQL_Latin1_General_CP1_CI_AS')),
            Column('Book_title', String(255, collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False),
            Column('Book_author', String(255, collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False),
            Column('Book_genre', Integer, ForeignKey('Book_Genre.Book_Genre_ID')),
            Column('Book_description', Text(collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False)
        )

        with engine.connect() as connection:
            query = select([books_table])
            result = connection.execute(query)
            return [dict(row) for row in result]
    except Exception as e:
        logging.error(f"Error fetching data from MSSQL: {e}")
        return []

# Function to index data into Elasticsearch
def index_data_to_elasticsearch(data):
    try:
        index_name = 'lab2'
        bulk_data = []
        for item in data:
            document = {
                "ISBN": item['ISBN'],
                "Book_title": item['Book_title'],
                "Book_author": item['Book_author'],
                "Book_genre": item['Book_genre'],
                "Book_description": item['Book_description']
            }
            bulk_data.append({
                "_index": index_name,
                "_id": item['ISBN'],
                "_source": document
            })
        helpers.bulk(es, bulk_data)
        logging.info(f"Indexed {len(bulk_data)} documents from MSSQL to Elasticsearch")
    except Exception as e:
        logging.error(f"Error indexing MSSQL data to Elasticsearch: {e}")

# Function to compare data from MSSQL and Elasticsearch
def compare_data():
    try:
        mssql_data = fetch_data_from_mssql()
        es_data = fetch_data_from_elasticsearch()
        mssql_isbns = {book['ISBN'] for book in mssql_data}
        es_isbns = {hit['_source']['ISBN'] for hit in es_data}
        if mssql_isbns == es_isbns:
            print("Data in MSSQL and Elasticsearch match.")
        else:
            print("Data in MSSQL and Elasticsearch do not match.")
    except Exception as e:
        logging.error(f"Error comparing data: {e}")

# Function to fetch data from Elasticsearch
def fetch_data_from_elasticsearch():
    try:
        res = es.search(index="lab2", body={"query": {"match_all": {}}})
        return res['hits']['hits']
    except Exception as e:
        logging.error(f"Error fetching data from Elasticsearch: {e}")
        return []

# Main function to perform indexing and comparison
def main():
    try:
        data = fetch_data_from_mssql()
        index_data_to_elasticsearch(data)
        compare_data()
        print("Indexing and comparison completed.")
    except Exception as e:
        logging.error(f"Error processing request: {e}")

# Example usage
data = fetch_data_from_mssql()
index_data_to_elasticsearch(data)
compare_data() 