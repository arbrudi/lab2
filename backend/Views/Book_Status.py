from flask import Blueprint, request, jsonify
from Models.Books import Books, User_Book_Status, Book_Status
from Models.Users import Users
from extensions import db

bookS_bp = Blueprint('bookS', __name__)

@bookS_bp.route('/book/get_status_by_id/<int:isbn>/<int:user_id>', methods=['GET'])
def get_book_status_by_id(isbn, user_id):
    try:
        book_status = User_Book_Status.query.filter_by(ISBN=isbn, User_ID=user_id).first()
        if book_status:
            status = Book_Status.query.get(book_status.Book_Status_ID)
            return jsonify({'Book_state': status.Book_state}), 200
        else:
            return jsonify({'Book_state': 'Status not available'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

    

@bookS_bp.route('/book/get_book_status', methods=['GET'])
def get_book_status():
    try:
        all_statuses = Book_Status.query.all()
        status_data = []
        for status in all_statuses:
            data = {
                'Book_Status_ID': status.Book_Status_ID,
                'Book_state': status.Book_state
            }
            status_data.append(data)
        return jsonify(status_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bookS_bp.route('/book/status', methods=['POST', 'PUT'])
def manage_book_status():
    try:
        user_id, isbn, book_status_id = get_json_data()
        user, book, status = get_db_data(user_id, isbn, book_status_id)

        if not all([user, book, status]):
            return jsonify({'error': 'Invalid user, book, or status.'}), 404

        user_book_entry = User_Book_Status.query.filter_by(User_ID=user_id, ISBN=isbn).first()

        if request.method == 'POST':
            return handle_post_request(user_book_entry, user_id, isbn, book_status_id)
        elif request.method == 'PUT':
            return handle_put_request(user_book_entry, user_id, isbn, book_status_id)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_json_data():

    data = request.get_json()

    if not data:
        raise ValueError('No JSON data received!')
    
    user_id = int(data.get('user_id'))
    isbn = int(data.get('isbn'))
    book_status_id = int(data.get('book_status'))

    return user_id, isbn, book_status_id

def get_db_data(user_id, isbn, book_status_id):

    user = Users.query.get(user_id)
    book = Books.query.get(isbn)
    status = Book_Status.query.get(book_status_id)

    return user, book, status

def handle_post_request(user_book_entry, user_id, isbn, book_status_id):

    if user_book_entry:
        return jsonify({'error': 'User book status entry already exists.'}), 400
    
    new_entry = User_Book_Status(
        User_ID=user_id,
        ISBN=isbn,
        Book_Status_ID=book_status_id
    )

    db.session.add(new_entry)
    db.session.commit()

    return jsonify({'message': 'Book status added successfully.'}), 200

def handle_put_request(user_book_entry, user_id, isbn, book_status_id):

    if not user_book_entry:
        new_entry = User_Book_Status(
            User_ID=user_id,
            ISBN=isbn,
            Book_Status_ID=book_status_id
        )

        db.session.add(new_entry)
        db.session.commit()

        return jsonify({'message': 'Book status added successfully.'}), 200
    
    user_book_entry.Book_Status_ID = book_status_id
    db.session.commit()
    
    return jsonify({'message': 'Book status updated successfully.'}), 200