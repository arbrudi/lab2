from flask import Blueprint, request, jsonify
from Models.Books import Books, User_Book_Status, Book_Status
from Models.Users import Users
from extensions import db

bookS_bp = Blueprint('bookS',__name__)


@bookS_bp.route('/book/get_status_by_id/<int:id>', methods = ['GET'])
def get_book_status_by_id():
    pass

@bookS_bp.route('/book/get_book_status', methods= ['GET'])
def get_book_status():
    pass
def add_book_status(user_id, isbn, book_status):
    user = Users.query.get(user_id)
    book = Books.query.get(isbn)
    status = Book_Status.query.get(book_status)

    if not user:
        return jsonify({'error': f"User {user} does not exist!"}), 404
    if not book:
        return jsonify({'error': f"Book {book} doesn't exist!"}), 404
    if not status:
        return jsonify({'error': f"Status {status} doesn't exist!"}), 404
    
    user_book_entry = User_Book_Status(
        User_ID= user.User_ID,
        ISBN = book.ISBN,
        Book_Status_ID = status.Book_Status_ID
    )

    db.session.add(user_book_entry)
    db.session.commit()

    return user_book_entry




