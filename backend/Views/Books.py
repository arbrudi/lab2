from flask import Blueprint, request, jsonify
from Models.Books import Books, Book_Genre
from extensions import db

books_bp = Blueprint('books',__name__)

@books_bp.route('/admin/book/create', methods=['POST'])
def add_book():
    try:
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
        new_book = Books(**data) # ** used to unpack each key-value of the dict.
        db.session.add(new_book)
        db.session.commit()

        return jsonify(data), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@books_bp.route('/admin/books', methods=['GET'])
def get_books():
    try:
        all_books = Books.query.all()
        books_data = []
        for book in all_books:
            _data = {
                'ISBN':book.ISBN,
                'Book_image':book.Book_image,
                'Book_title': book.Book_title,
                'Book_author': book.Book_author,
                'Book_genre': book.Book_genre,
                'Book_description': book.Book_description
            }
            books_data.append(_data)

        return jsonify(books_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500
    
@books_bp.route('/admin/book/<int:id>', methods=['GET'])
def get_book(id):
    try:
        book = Books.query.get(id)
        if book is None:
            return jsonify({'error':'Book not found'}), 404
        
        book_data = {
            'ISBN': book.ISBN,
            'Book_image': book.Book_image,
            'Book_title': book.Book_title,
            'Book_author': book.Book_author,
            'Book_genre': book.Book_genre,
            'Book_description': book.Book_description
        }

        return jsonify(book_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@books_bp.route('/admin/book/update/<int:id>', methods=['GET', 'POST', 'PUT'])
def update_book(id):
    try:
        book = Books.query.get(id)
        if book is None:
            return jsonify({'error':'Book not found'}), 404
        
        data = request.get_json()
        for key, value in data.items():
            setattr(book, key, value)

        db.session.commit()
        return jsonify({'message': 'Book updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@books_bp.route('/admin/book/delete/<int:ISBN>', methods=['DELETE'])
def delete_book(ISBN):
    try:
        book = Books.query.get(ISBN)
        if book is None:
            return jsonify({'error': 'Book not found'}), 404

        db.session.delete(book)
        db.session.commit()
        
        return jsonify({'message': 'Book deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


