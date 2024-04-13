from extensions import db

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
    Comics_Author_ID = db.Column(db.Integer, primary_key=True)
    Comic_ID  = db.Column(db.String(50), db.ForeignKey('Comics.Comic_ID'), nullable=False)
    Author_Name = db.Column(db.String(50), nullable=False)
    Publisher = db.Column(db.String(50), nullable=False)
    Author_notes = db.Column(db.String(255))