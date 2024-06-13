from flask import Blueprint, request, jsonify
from Models.Comic import Comics, Favorite_comic
from Models.Users import Users
from extensions import db

fComic_bp = Blueprint('fComic', __name__)


@fComic_bp.route('/comic/favorite', methods=['POST'])
def add_favorite_comic():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        comic_id = data.get('comic_id')
        
        # Check if the favorite already exists
        existing_favorite = Favorite_comic.query.filter_by(Comic_ID=comic_id, User_ID=user_id).first()
        if existing_favorite:
            return jsonify({'message': 'Comic already in favorites'}), 200
        
        new_favorite = Favorite_comic(User_ID=user_id, Comic_ID=comic_id)
        db.session.add(new_favorite)
        db.session.commit()
        
        return jsonify({'message': 'Favorite added successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500





@fComic_bp.route('/comic/Favorite/<int:comic_id>/<int:user_id>', methods=['GET'])
def get_Favorite_comic_by_id(comic_id, user_id):
    try:
        Favorite_comic = Favorite_comic.query.filter_by(Comic_ID=comic_id, User_ID=user_id).first()
        
        if Favorite_comic:
            return jsonify({'Favorit comic': Favorite_comic.Comic_list_name}), 200
        else:
            return jsonify({'error': 'Favorite comic not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@fComic_bp.route('/comic/Favorite/<int:user_id>', methods=['GET'])
def get_Favorite(user_id):
    try:
        fComic = Favorite_comic.query.filter_by(User_ID=user_id).all()
        rating_data = []
        for rating in fComic:
            _data = {
                'Favorite_Comic_Id': rating.Favorite_Comic_Id,
                'User_ID': rating.User_ID,
                'Comic_ID': rating.Comic_ID,
            
            }
            rating_data.append(_data)
        return jsonify(rating_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

from flask import Blueprint, request, jsonify
from Models.Comic import Comics, Favorite_comic
from Models.Users import Users
from extensions import db

fComic_bp = Blueprint('fComic', __name__)

@fComic_bp.route('/comic/Favorite/Delete', methods=['DELETE'])
def delete_Favorite():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        comic_id = data.get('comic_id')

        favorite_comic_to_delete = Favorite_comic.query.filter_by(Comic_ID=comic_id, User_ID=user_id).first()

        if favorite_comic_to_delete:
            db.session.delete(favorite_comic_to_delete)
            db.session.commit()
            return jsonify({'message': 'Favorite deleted successfully'}), 200
        else:
            return jsonify({'error': 'Favorite not found'}), 404

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
