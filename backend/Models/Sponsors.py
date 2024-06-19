from pymongo.errors import PyMongoError

class Sponsors:
    def __init__(self, Logo, Sponsor_name, Joined_on):
        self.Logo = Logo
        self.Sponsor_name = Sponsor_name
        self.Joined_on = Joined_on

    def to_dict(self):
        return {
            "Logo": self.Logo,
            "Sponsor_name": self.Sponsor_name,
            "Joined_on": self.Joined_on
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            Logo=data.get('Logo'),
            Sponsor_name=data.get('Sponsor_name'),
            Joined_on=data.get('Joined_on')
        )

    def save(self, mongo_client):
        try:
            result = mongo_client.db.sponsors.insert_one(self.to_dict())
            return result
        except PyMongoError as e:
            raise Exception(f"Error saving sponsor: {e}")