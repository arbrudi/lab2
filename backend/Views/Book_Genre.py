from flask import Blueprint, request, jsonify
from Models.Books import Books, Book_Genre
from extensions import db

bookG_bp = Blueprint('bookG',__name__)

@bookG_bp.route('admin/book_genre/create', methods=['POST'])
def add_book_genre():
    try:
        data= request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
            new_genre =Book_Genre(**data)
            db.session.add(new_genre)
            db.session.commit()

            return jsonify(data), 201
    except Exception as e:
        print('Error', e)
        return jsonify({'error': str(e)}), 500
    
@bookG_bp.route('/admin/book_genres', methods=['GET'])
def get_book_genres():
    try:
        all_genres = Book_Genre.query.all()
        genre_data=[]
        for genre in all_genres:
            _data = {
                'Book_Genre_ID':genre.Book_Genre_ID,
                'ISBN':genre.ISBN,
                'Genre_Name':genre.Genre_Name
            }
            genre_data.append(_data)
        return jsonify(genre_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({'error':str(e)}), 500
    
@bookG_bp.route('/admin/book_genre/<int:id>', methods=['GET'])
def get_book_genre(id):
    try:
        genre = Book_Genre.query.get(id)
        if genre is None:
            return jsonify({'error':'Genre not found!'}), 404
        
        genre_data={
                'Book_Genre_ID':genre.Book_Genre_ID,
                'ISBN':genre.ISBN,
                'Genre_Name':genre.Genre_Name
        }
        return jsonify(genre_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
@bookG_bp.route('/admin/book_genre/update/<int: id>', methods =['GET', 'POST', 'PUT'])
def update_book_genre(id):
    try:
        genre = Book_Genre.query.get(id)
        if genre is None:
            return jsonify({'error':'Genre not found!'})
        
        data = request.get_json()
        for key, value in data.items():
            setattr(genre, key, value)

        db.session.commit()
        return jsonify({'message':'Genre updated successfully!'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error":str(e)}), 500
    
@bookG_bp.route('/admin/book_genre/delete/<int: id>', methods=['DELETE'])
def delete_book_genre(id):
    try:
        genre = Book_Genre.quety.get(id)
        if genre is None:
            return jsonify({'error':'Genre not found!'}), 404
        
        db.session.delete(genre)
        db.session.commit()

        return jsonify({'message':'Genre deleted successfully!'}), 200
    
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500