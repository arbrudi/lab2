from flask import Blueprint, request, jsonify
from Models.Users import Users
from Models.Books import Books, Book_ratings
from extensions import db


bRating_bp = Blueprint('bRating', __name__)


@bRating_bp.route('/books/get_rating_by_id/<int:book_id>/<int:user_id>', methods=['GET'])
def get_book_by_id(book_id, user_id):
    try:
        book_rating = Book_ratings.query.filter_by(ISBN=book_id, User_ID=user_id).first()
        
        if book_rating:
            if 1 <= book_rating.Book_rating <= 5:
                return jsonify({'Book_Rating': book_rating.Book_rating}), 200
            else:
                return jsonify({'error': 'Book rating out of valid range (1-5)'}), 400
        else:
            return jsonify({'Book_Rating': 'Rating not available'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@bRating_bp.route('/books/ratings', methods=['POST'])
def add_or_update_book_rating():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        book_id = data.get('book_id')
        book_rating = data.get('book_rating')

        if not (1 <= book_rating <= 5):
            return jsonify({'error': 'Book rating must be between 1 and 5'}), 400

        existing_rating = Book_ratings.query.filter_by(ISBN=book_id, User_ID=user_id).first()

        if existing_rating:
            existing_rating.Book_rating = book_rating
        else:
            new_rating = Book_ratings(ISBN=book_id, User_ID=user_id, Book_rating=book_rating)
            db.session.add(new_rating)
        
        db.session.commit()

        return jsonify({'message': 'Rating added/updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bRating_bp.route('/books/get_all_ratings/<int:user_id>', methods=['GET'])
def get_all_ratings(user_id):
    try:
        all_ratings = Book_ratings.query.filter_by(User_ID=user_id).all()
        rating_data = [
            {
                'Book_rating_ID': rating.Book_rating_ID,
                'User_ID': rating.User_ID,
                'ISBN': rating.ISBN,
                'Book_rating': rating.Book_rating,
            }
            for rating in all_ratings
        ]
        return jsonify(rating_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bRating_bp.route('/books/delete_rating', methods=['DELETE'])
def delete_book_rating():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        book_id = data.get('book_id')

        rating_to_delete = Book_ratings.query.filter_by(ISBN=book_id, User_ID=user_id).first()

        if rating_to_delete:
            db.session.delete(rating_to_delete)
            db.session.commit()
            return jsonify({'message': 'Rating deleted successfully'}), 200
        else:
            return jsonify({'error': 'Rating not found'}), 404

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
