from extensions import db 

class Events(db.Model):
    __tablename__ = 'events'
    Event_ID = db.Column(db.String(255), primary_key=True)
    Event_image = db.Column(db.Text)
    Event_description = db.Column(db.Text)
    Event_date = db.Column(db.Date)

class Event_Participants(db.Model):
    __tablename__ = 'event_participants'
    Event_ID = db.Column(db.String(255), db.ForeignKey('events.Event_ID'), primary_key=True)
    User_ID = db.Column(db.Integer, primary_key=True)