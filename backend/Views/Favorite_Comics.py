from flask import Blueprint, request, jsonify
from Models.Comic import Comics, User_Favorite_comics
from Models.Users import Users
from extensions import db

fComic_bp = Blueprint('fComic', __name__)

@fComic_bp.route('/comic/Favorite/<int:comic_id>/<int:user_id>', methods=['GET'])
def get_Favorite_comic_by_id(comic_id, user_id):
    try:
        Favorite_comic = User_Favorite_comics.query.filter_by(Comic_ID=comic_id, User_ID=user_id).first()
        
        if Favorite_comic:
            return jsonify({'Comic_Rating': Favorite_comic.Comic_list_name}), 200
        else:
            return jsonify({'error': 'Favorite comic not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500