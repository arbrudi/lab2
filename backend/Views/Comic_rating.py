from flask import Blueprint, request, jsonify
from Models.Comic import Comics, User_Comic_rating
from Models.Users import Users
from extensions import db

cRating_bp = Blueprint('cRating', __name__)

@cRating_bp.route('/comic/get_rating_by_id/<int:comic_id>/<int:user_id>', methods=['GET'])
def get_comic_rating_by_id(comic_id, user_id):
    try:
        comic_rating = User_Comic_rating.query.filter_by(Comic_ID=comic_id, User_ID=user_id).first()
        
        if comic_rating:
            # Ensure rating is within the valid range
            if 1 <= comic_rating.Comic_Rating <= 5:
                return jsonify({'Comic_Rating': comic_rating.Comic_Rating}), 200
            else:
                return jsonify({'error': 'Comic rating out of valid range (1-5)'}), 500
        else:
            return jsonify({'Comic_Rating': 'Rating not available'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    



    

@cRating_bp.route('/comic/rating', methods=['POST'])
def add_or_update_comic_rating():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        comic_id = data.get('comic_id')
        comic_rating = data.get('comic_rating')

        if not (1 <= comic_rating <= 5):
            return jsonify({'error': 'Comic rating must be between 1 and 5'}), 400

        existing_rating = User_Comic_rating.query.filter_by(Comic_ID=comic_id, User_ID=user_id).first()

        if existing_rating:
            existing_rating.Comic_Rating = comic_rating
        else:
            new_rating = User_Comic_rating(User_ID=user_id, Comic_ID=comic_id, Comic_Rating=comic_rating)
            db.session.add(new_rating)
        
        db.session.commit()

        return jsonify({'message': 'Rating added/updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



@cRating_bp.route('/comic/get_all_ratings/<int:user_id>', methods=['GET'])
def get_all_ratings(user_id):
    try:
        all_ratings = User_Comic_rating.query.filter_by(User_ID=user_id).all()
        rating_data = []
        for rating in all_ratings:
            _data = {
                'Comic_rating_ID': rating.Comic_rating_ID,
                'User_ID': rating.User_ID,
                'Comic_ID': rating.Comic_ID,
                'Comic_Rating': rating.Comic_Rating,
            }
            rating_data.append(_data)
        return jsonify(rating_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cRating_bp.route('/comic/delete_rating', methods=['DELETE'])
def delete_comic_rating():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        comic_id = data.get('comic_id')

        rating_to_delete = User_Comic_rating.query.filter_by(Comic_ID=comic_id, User_ID=user_id).first()

        if rating_to_delete:
            db.session.delete(rating_to_delete)
            db.session.commit()
            return jsonify({'message': 'Rating deleted successfully'}), 200
        else:
            return jsonify({'error': 'Rating not found'}), 404

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
