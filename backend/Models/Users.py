from extensions import db
from Models.Events import Event_Participants
class Users(db.Model):
    __tablename__ ='Users'
    User_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(255), nullable=False)
    Surname = db.Column(db.String(255), nullable=False)
    User_Role = db.Column(db.String(255), nullable=False)
    Email = db.Column(db.String(255), nullable=False)
    Username = db.Column(db.String(50), unique=True, nullable=False)
    Password = db.Column(db.String(60), nullable=False)

   
    # participant = db.relationship('Event_Participants', backref='user', overlaps='Event_participants, users')
 


 
    def __repr__(self):
        return f"User('{self.username}')"