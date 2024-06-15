from extensions import db
from sqlalchemy import ForeignKey, Integer, Column
from sqlalchemy.orm import relationship
from Models.Users import Users

class Comics(db.Model):
    __tablename__ = 'Comics'
    Comic_ID = db.Column(db.String(50), primary_key=True)
    Comic_image = db.Column(db.Text)
    Comic_title = db.Column(db.String(255), nullable=False)
    Comic_type = db.Column(db.String(255), nullable=False)
    Comic_Description = db.Column(db.Text, nullable=False)
    author = db.relationship('Comics_Author', backref='comic', overlaps="Comics_Author,comic")

class Comics_Author(db.Model):
    __tablename__ = 'Comics_Author'  
    Comics_Author_ID = db.Column(db.Integer, primary_key=True ,autoincrement=False)
    Comic_ID  = db.Column(db.String(50), db.ForeignKey('Comics.Comic_ID'), nullable=False)
    Author_Name = db.Column(db.String(50), nullable=False)
    Publisher = db.Column(db.String(50), nullable=False)
    Author_notes = db.Column(db.String(255))

class User_Comic_rating(db.Model):

    __tablename__ = 'Comic_ratings'
    Comic_rating_ID = db.Column(db.Integer, primary_key=True, autoincrement = True)
    User_ID = Column(Integer, ForeignKey('Users.User_ID'), nullable=False)   
    Comic_ID = Column(Integer, ForeignKey('Comics.Comic_ID'),  nullable=False)
    Comic_Rating = db.Column(db.Integer, nullable=False)

    comic = relationship ('Comics',backref=db.backref('User_comic_ratings',cascade='all, delete-orphan'))
    user = relationship ('Users',backref=db.backref('User_comic_ratings',cascade='all, delete-orphan'),
                         primaryjoin='User_Comic_rating.User_ID == Users.User_ID')    
