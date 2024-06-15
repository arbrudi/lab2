from flask import Blueprint, jsonify, request
from elasticsearch import Elasticsearch

# Define the Blueprint
search_bp = Blueprint('search_bp', __name__)

# Initialize Elasticsearch client with Cloud ID and API Key
cloud_id = "uBjVFpABj4l0RCL23Qps:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDJiNjMwNjVmYzhiZTQ2ODA5YTdjOTUwZjAzNWZiZmI0JDc4MDhmOGY4YTY1ZTQwNjJiMjIzMjM4Y2FmMjdlMzU1"
api_key = "ilX2S6KSQzama1GB4P8T9w"

try:
    es = Elasticsearch(
        cloud_id=cloud_id,
        api_key=api_key
    )
    # Check if the connection is successful
    if es.ping():
        print("Connected to Elasticsearch successfully!")
    else:
        print("Failed to connect to Elasticsearch.")
except Exception as e:
    print(f"Error connecting to Elasticsearch: {e}")

@search_bp.route('/search', methods=['GET'])
def search_data():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        es_query = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["field1", "field2", "field3"]  # Adjust fields as per your Elasticsearch index
                }
            }
        }
        results = es.search(index="lab2", body=es_query)
        hits = results['hits']['hits']
        print(f"Search query executed successfully. Found {len(hits)} hits.")
        return jsonify([hit['_source'] for hit in hits]), 200
    except Exception as e:
        print(f"Error executing search query: {e}")
        return jsonify({'error': str(e)}), 500




    
  #"id": "uBjVFpABj4l0RCL23Qps",
  #"name": "lab2",
  #"api_key": "ilX2S6KSQzama1GB4P8T9w",
 # "encoded": "dUJqVkZwQUJqNGwwUkNMMjNRcHM6aWxYMlM2S1NRemFtYTFHQjRQOFQ5dw==",
  #"beats_logstash_format": "uBjVFpABj4l0RCL23Qps:ilX2S6KSQzama1GB4P8T9w"
