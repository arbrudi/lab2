from flask import Blueprint, request, jsonify
from Models.Books import Books, Favorite_books
from extensions import db

favbook_bp = Blueprint('favB', __name__)


@favbook_bp.route('/favorite/book/add', methods = ["POST"])
def add_favorite_book():
    try:
        data = request.get_json()
        user_id = data.get('User_ID')
        book_id = data.get('ISBN')

        exists = Favorite_books.query.filter_by(User_ID=user_id, ISBN = book_id).first()
        if exists:
            jsonify({'message':'This book is already in the list'})
        new_fav = Favorite_books(User_ID = user_id, ISBN = book_id)
        db.session.add(new_fav)
        db.session.commit()

        return jsonify({'message':'Favorite book added successfully'})
    except Exception as e:
        print('Error', e)
        return jsonify({'error',str(e)}),500

@favbook_bp.route('/favorite/book/<int:user_id>', methods =["GET"])
def get_favorite_books(user_id):
    try:
        all_favorites = Favorite_books.query.filter_by(User_ID = user_id).all() # SELECT * From Favorite_books WHERE User_ID=USer_ID
        data = []
        for book in all_favorites:
            _data = {
                'Favorite_Book_ID': book.Favorite_Book_ID,
                'User_ID':book.User_ID,
                'ISBN':book.ISBN
            }
            data.append(_data)
            return jsonify(data),200
    except Exception as e:
        print('Error',e)
        return jsonify({'error',str(e)}),500
    
@favbook_bp.route('/favorite/book/delete', methods=['DELETE'])
def delete_Favorite():
    try:
        data = request.get_json()
        user_id = data.get('User_ID')
        book_id = data.get('ISBN')

        fav_book = Favorite_books.query.filter_by(User_ID=user_id, ISBN=book_id).first()

        if fav_book:
            db.session.delete(fav_book)
            db.session.commit()
            return jsonify({'message': 'Book deleted successfully'}), 200
        else:
            return jsonify({'error': 'Book not found'}), 404

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500