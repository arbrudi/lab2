from extensions import db
from sqlalchemy import ForeignKey, Integer, Column, String
from sqlalchemy.orm import relationship

class Groupi(db.Model):
    __tablename__ = 'Groupi'
    GroupID = Column(Integer, primary_key=True, autoincrement=True)
    GroupName = Column(String(50), nullable=False)
    Description = Column(String(255), nullable=False)

class Member(db.Model):
    __tablename__ ="Member"
    MemberID = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String(25), nullable=False)
    Role = Column(String, nullable=False)
    GroupID = Column(Integer, ForeignKey('Groupi.GroupID'),nullable=False)
    group = db.relationship('Groupi', backref='group', overlaps="member,groupi", primaryjoin='Member.GroupID == Groupi.GroupID')