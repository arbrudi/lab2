from flask import Blueprint, current_app
from elasticsearch import Elasticsearch, NotFoundError, RequestError

# Define the Blueprint for search functionality
search_bp = Blueprint('search_bp', __name__)

# Initialize Elasticsearch client with authentication
es = Elasticsearch(
    [{'host': 'localhost', 'port': 9200}],
    http_auth=('elastic', 'dkjGfNMmL6f6SjdldHc5')
)

@search_bp.route('/search')
def search():
    current_app.logger.info("Received request on /search endpoint")
    print("Received request on /search endpoint")
    try:
        # Test connection to Elasticsearch
        if es.ping():
            current_app.logger.info("Connected to Elasticsearch!")
            print("Connected to Elasticsearch!")
            # Example: Perform a search query
            index_name = "lab2"
            try:
                if not es.indices.exists(index=index_name):
                    es.indices.create(index=index_name)
                    current_app.logger.info(f"Created Elasticsearch index '{index_name}'.")
                    print(f"Created Elasticsearch index '{index_name}'.")
                    return f"Elasticsearch index '{index_name}' created. Try your search query again."
                else:
                    res = es.search(index=index_name, body={"query": {"match_all": {}}})
                    return f"Got {res['hits']['total']['value']} hits from Elasticsearch for index '{index_name}'."
            except RequestError as e:
                if e.error == 'resource_already_exists_exception':
                    current_app.logger.info(f"Elasticsearch index '{index_name}' already exists.")
                    print(f"Elasticsearch index '{index_name}' already exists.")
                    res = es.search(index=index_name, body={"query": {"match_all": {}}})
                    return f"Got {res['hits']['total']['value']} hits from Elasticsearch for index '{index_name}'."
                else:
                    current_app.logger.error(f"Error creating Elasticsearch index '{index_name}': {e}")
                    print(f"Error creating Elasticsearch index '{index_name}': {e}")
                    return f"Error creating Elasticsearch index '{index_name}'. Please check logs for details.", 500
        else:
            return "Failed to connect to Elasticsearch."
    except NotFoundError as e:
        current_app.logger.error(f"Elasticsearch index not found error: {e}")
        print(f"Elasticsearch index not found error: {e}")
        return "Elasticsearch index not found error. Please check logs for details.", 404
    except Exception as e:
        current_app.logger.error(f"Error connecting to Elasticsearch: {e}")
        print(f"Error connecting to Elasticsearch: {e}")
        return "Error connecting to Elasticsearch. Please check logs for details.", 500