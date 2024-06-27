from extensions import db
from sqlalchemy import ForeignKey, Integer, Column, String
from sqlalchemy.orm import relationship

class Team(db.Model):
    __tablename__ = 'Team'
    TeamID = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(50), nullable=False)

class Player(db.Model):
    __tablename__ ="Player"
    PlayerId = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(25), nullable=False)
    Number = Column(Integer, nullable=False)
    BirthYear = Column(Integer, nullable=False)
    TeamID = Column(Integer, ForeignKey('Team.TeamID'),nullable=False)
    team = db.relationship('Team', backref='team', overlaps="player,team", primaryjoin='Player.TeamID == Team.TeamID')