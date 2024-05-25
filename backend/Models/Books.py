from extensions import db
from Models.Users import Users

class Books(db.Model):
    """Base Model for books"""
    __tablename__ = 'Books'
    ISBN = db.Column(db.Integer, primary_key=True, autoincrement=False)
    Book_image = db.Column(db.Text)
    Book_title = db.Column(db.String(255), nullable=False)
    Book_author = db.Column(db.String(255), nullable=False)
    Book_genre = db.Column(db.Integer, nullable=False)
    Book_description = db.Column(db.Text, nullable=False)
    genres = db.relationship('Book_Genre', backref='book', overlaps="Book_genre,books")

class Book_Genre(db.Model):
    """Base model for Book_Genre"""
    __tablename__ = 'Book_Genre'  
    Book_Genre_ID = db.Column(db.Integer, primary_key=True, autoincrement = False)
    ISBN = db.Column(db.Integer, db.ForeignKey('Books.ISBN'), nullable=False)
    Genre_Name = db.Column(db.String(50), nullable=False)

class Book_Status(db.Model):
    """Base model for Book_Status"""
    __tablename__ = 'Book_Status'
    ISBN = db.Column(db.Integer, db.ForeignKey('Books.ISBN'), nullable = False)
    User_ID = db.Column(db.Integer, db.ForeignKey('Users.User_ID'), nullable = False)
    Book_Status_ID = db.Column(db.Integer, primary_key=True, autoincrement=False)
    Book_state = db.Column(db.String(25), nullable = False)

    __table_args__ = (
        db.CheckConstraint(
            Book_state.in_(['Read', 'Going to read', 'Dropped', 'Finished']), 
            name='b_state'
        ),
    )