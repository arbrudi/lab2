from flask import Blueprint, Flask, request, jsonify
import pickle
import os
import pandas as pd
import numpy as np
from extensions import db
from sqlalchemy.sql import text

recommendation_bp = Blueprint('recommendation_bp', __name__)

ARTIFACTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ML_Model', 'artifacts')

model_path = os.path.join(ARTIFACTS_DIR, 'model.pkl')
user_data_path = os.path.join(ARTIFACTS_DIR, 'book_pivot.pkl')
final_rating_path = os.path.join(ARTIFACTS_DIR, 'final_rating.pkl')

with open(model_path, 'rb') as f:
    model = pickle.load(f)

book_pivot = pd.read_pickle(user_data_path)
df_final_rating = pd.read_pickle(final_rating_path)

print("DataFrame shape:", book_pivot.shape)
print("Model expected features:", model.n_features_in_)
print('cols', type(df_final_rating))

@recommendation_bp.route('/')
def index():
    return "Book-Based Recommendation System"

def recommend_book(book_name):
    try:
        if book_name not in book_pivot.index:
            return jsonify({'error': 'Book not found'}), 404

        book_id = np.where(book_pivot.index == book_name)[0][0]

        distance, suggestion = model.kneighbors(book_pivot.iloc[book_id, :].values.reshape(1, -1), n_neighbors=6)
        
        recommended_books = []
        for i in range(len(suggestion)):
            books = book_pivot.index[suggestion[i]]
            for j in books:
                if j != book_name:
                    recommended_books.append(j)
        
        return jsonify(recommended_books)
    
    except IndexError:
        return jsonify({'error': 'Book not found in the dataset'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@recommendation_bp.route('/recommend_book', methods=['GET'])
def recommend_book_route():
    # book_name = request.args.get('book_name')
    book_name = 'Harry Potter and the Chamber of Secrets (Book 2)'
    if not book_name:
        return jsonify({'error': 'No book name provided'}), 400
    
    return recommend_book(book_name)

app = Flask(__name__)
app.register_blueprint(recommendation_bp, url_prefix='/recommendations')

if __name__ == '__main__':
    app.run(debug=True)
