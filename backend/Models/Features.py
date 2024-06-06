from flask_pymongo import PyMongo

mongo = PyMongo()

class Features:
    def __init__(self, icon, name, description):
        self.icon = icon
        self.name = name
        self.description = description

    def to_dict(self):
        return {
            "icon": self.icon,
            "name": self.name,
            "description": self.description
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            icon=data.get('icon'),
            name=data.get('name'),
            description=data.get('description')
        )