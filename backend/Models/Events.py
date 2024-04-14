from extensions import db 

class Events(db.Model):
    __tablename__ = 'events'
    Event_ID = db.Column(db.String(255), primary_key=True)
    Event_image = db.Column(db.Text)
    Event_description = db.Column(db.Text)
    Event_date = db.Column(db.Date)
    # Define the relationship with Event_Participants and cascade the deletion
    participant = db.relationship('Event_Participants', backref='event', overlaps='Event_participants, events')

class Event_Participants(db.Model):
    __tablename__ = 'event_participants'
    Event_ID = db.Column(db.String(255), db.ForeignKey('events.Event_ID'), primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('users.User_ID'), primary_key=True)
    