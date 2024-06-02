from flask import Blueprint, request, jsonify
import os
import pandas as pd
import numpy as np

recommendation_bp = Blueprint('recommendation_bp', __name__)

ARTIFACTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ML_Model', 'artifacts')

model_path = os.path.join(ARTIFACTS_DIR, 'model.pkl')
user_data_path = os.path.join(ARTIFACTS_DIR, 'book_pivot.pkl')
final_rating_path = os.path.join(ARTIFACTS_DIR, 'final_rating.pkl')

model = pd.read_pickle(model_path)
book_pivot = pd.read_pickle(user_data_path)
df_final_rating = pd.read_pickle(final_rating_path)

def recommend_book(book_name):
    try:
        if book_name not in book_pivot.index:
            return jsonify({'error': 'Book not found'}), 404

        book_id = np.where(book_pivot.index == book_name)[0][0]
        distance, suggestion = model.kneighbors(book_pivot.iloc[book_id, :].values.reshape(1, -1), n_neighbors=5)
        
        recommended_books = []
        for i in range(len(suggestion)):
            books = book_pivot.index[suggestion[i]]
            for j in books:
                if j != book_name:
                    recommended_books.append(j)
        
        return recommended_books
    
    except IndexError:
        return jsonify({'error': 'Book not found in the dataset'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@recommendation_bp.route('/recommend_book', methods=['GET'])
def recommend_book_route():
    book_name = request.args.get('book_name')
    if not book_name:
        return jsonify({'error': 'No book name provided'}), 400
    
    recommended_books = recommend_book(book_name)
    
    recommended_books_details = []
    for recommended_book in recommended_books:
        book_details = df_final_rating[df_final_rating['title'] == recommended_book]
        if not book_details.empty:
            recommended_books_details.append({
                'title': recommended_book,
                'author': book_details['author'].values[0],
                'img_url': book_details['img_url'].values[0]
            })
    
    return jsonify(recommended_books_details)
