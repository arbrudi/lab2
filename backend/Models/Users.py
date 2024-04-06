from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    User_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(255), nullable=False)
    Surname = db.Column(db.String(255), nullable=False)
    User_Role = db.Column(db.String(255), nullable=False)
    Email = db.Column(db.String(255), nullable=False)
    Username = db.Column(db.String(50), unique=True, nullable=False)
    Password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}')"
