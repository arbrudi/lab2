from flask import Blueprint
from elasticsearch import Elasticsearch, helpers
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Text, ForeignKey, select
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Blueprint for search API routes
search_bp = Blueprint('search_bp', __name__)

# Elasticsearch client initialization
es = Elasticsearch(
    [{'host': 'localhost', 'port': 9200}],
    http_auth=('elastic', 'dkjGfNMmL6f6SjdldHc5')
)

# Database connection string
conn_str = (
    'mssql+pyodbc:///?odbc_connect='
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-UD05JRG\\MSSQLSERVER01;'
    'DATABASE=lab2;'
    'Trusted_Connection=yes;'
)

# Initialize SQLAlchemy engine and metadata
engine = create_engine(conn_str)

# Define the Books table explicitly
books_table = Table(
    'Books',
    Column('ISBN', Integer, primary_key=True, nullable=False),
    Column('Book_image', Text(collation='SQL_Latin1_General_CP1_CI_AS')),
    Column('Book_title', String(255, collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False),
    Column('Book_author', String(255, collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False),
    Column('Book_genre', Integer, ForeignKey('Book_Genre.Book_Genre_ID')),
    Column('Book_description', Text(collation='SQL_Latin1_General_CP1_CI_AS'), nullable=False)
)

# Function to fetch data from MSSQL
def fetch_data_from_mssql():
    try:
        with engine.connect() as connection:
            query = select([
                books_table.c.ISBN,
                books_table.c.Book_image,
                books_table.c.Book_title,
                books_table.c.Book_author,
                books_table.c.Book_genre,
                books_table.c.Book_description
            ])
            result = connection.execute(query)
            data = [dict(row) for row in result]
            logger.info(f"Fetched data from MSSQL: {data}")
            return data
    except Exception as e:
        logger.error(f"Error fetching data from MSSQL: {e}")
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
        logger.info(f"Indexed {len(bulk_data)} documents from MSSQL to Elasticsearch")
    except Exception as e:
        logger.error(f"Error indexing MSSQL data to Elasticsearch: {e}")

# Main function to execute fetching and indexing
def main():
    try:
        data = fetch_data_from_mssql()
        index_data_to_elasticsearch(data)
        logger.info("Indexing completed.")
    except Exception as e:
        logger.error(f"Error processing request: {e}")

if __name__ == "__main__":
    main()