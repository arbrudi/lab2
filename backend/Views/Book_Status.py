from flask import Blueprint, request, jsonify
from Models.Books import Books, Book_Genre
from extensions import db

bookS_bp = Blueprint('bookS',__name__)


@bookS_bp.route('/book/get_status_by_id/<int: id>', methpds = ['GET'])
def get_book_status_by_id():
    pass

@bookS_bp.route('/book/get_book_status', methods= ['GET'])
def get_book_status():
    pass
def add_book_status():
  pass
