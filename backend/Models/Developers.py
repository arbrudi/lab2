from pymongo.errors import PyMongoError



class Developers:

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

    def save(self, mongo_client):
        try:
            result = mongo_client.db.Developers.insert_one(self.to_dict())
            return result
        except PyMongoError as e:
            raise Exception(f"Error saving Developers: {e}")