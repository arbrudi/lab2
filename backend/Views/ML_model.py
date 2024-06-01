from flask import Blueprint, Flask, request, jsonify
import pickle
import os
import pandas as pd

recommendation_bp = Blueprint('recommendation_bp', __name__)

ARTIFACTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ML_Model', 'artifacts')

model_path = os.path.join(ARTIFACTS_DIR, 'model.pkl')
user_data_path = os.path.join(ARTIFACTS_DIR, 'book_pivot.pkl')
# books_data_path = os.path.join(ARTIFACTS_DIR, 'books_name.pkl') 
final_rating_path = os.path.join(ARTIFACTS_DIR, 'final_rating.pkl')

with open(model_path, 'rb') as f:
    model = pickle.load(f)

df = pd.read_pickle(user_data_path)

# books_df = pd.read_pickle(books_data_path)

df_final_rating = pd.read_pickle(final_rating_path)

print("DataFrame shape:", df.shape)
# print("Books DataFrame shape:", books_df.shape)
print("Model expected features:", model.n_features_in_)
# print("Books DataFrame columns:", type(books_df),'heehhehe', books_df)
print('cols', type(df_final_rating))

sample_user_id = df.index[0] 

@recommendation_bp.route('/')
def index():
    return "User-Based Book Recommendation System"

@recommendation_bp.route('/test_model')
def test_model():
    n_recommendations = 5
    user_vector = df.loc[sample_user_id].values

    print("User vector shape:", user_vector.shape)

    if user_vector is None:
        return jsonify({'error': 'Sample user not found'}), 404

    distances, indices = model.kneighbors([user_vector], n_neighbors=n_recommendations)
    
    recommendations = indices[0].tolist()
    
    print("Recommendations:", recommendations)
    
    if isinstance(df_final_rating, pd.DataFrame):
        try:
            recommended_books = df_final_rating.iloc[recommendations] 
            recommended_books_list = recommended_books.to_dict(orient='records')
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'books_df is not a DataFrame'}), 500
    
    return jsonify(recommended_books_list)
