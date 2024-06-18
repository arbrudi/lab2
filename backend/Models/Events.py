from extensions import db

class Events(db.Model):
    __tablename__ = 'events'
    Event_ID = db.Column(db.String(255), primary_key=True)
    Event_title = db.Column(db.String, nullable=False)
    Event_image = db.Column(db.Text)
    Event_description = db.Column(db.Text)
    Event_date = db.Column(db.Date)

class Event_Participants(db.Model):
    __tablename__ = 'event_participants'
    Event_ID = db.Column(db.String(255), db.ForeignKey('events.Event_ID'), primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('Users.User_ID'), primary_key=True)

    event = db.relationship('Events', backref=db.backref('event_participants_entries'))
    user = db.relationship('Users', backref=db.backref('event_participants_entries'))

    def __repr__(self):
        return f"Event_Participants(Event_ID={self.Event_ID}, User_ID={self.User_ID})"