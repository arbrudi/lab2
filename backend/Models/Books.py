from extensions import db

class Books(db.Model):
    __tablename__ = 'Books'
    ISBN = db.Column(db.Integer, primary_key=True, autoincrement=False)
    Book_image = db.Column(db.Text)
    Book_title = db.Column(db.String(255), nullable=False)
    Book_author = db.Column(db.String(255), nullable=False)
    Book_genre = db.Column(db.Integer, nullable=False)
    Book_description = db.Column(db.Text, nullable=False)
    genres = db.relationship('Book_Genre', backref='book', overlaps="Book_genre,books")

class Book_Genre(db.Model):
    __tablename__ = 'Book_Genre'  
    Book_Genre_ID = db.Column(db.Integer, primary_key=True, autoincrement = False)
    ISBN = db.Column(db.Integer, db.ForeignKey('Books.ISBN'), nullable=False)
    Genre_Name = db.Column(db.String(50), nullable=False)
