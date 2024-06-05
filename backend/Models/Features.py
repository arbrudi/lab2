class Feature:
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

    @staticmethod
    def from_dict(data):
        return Feature(
            icon=data.get('icon'),
            name=data.get('name'),
            description=data.get('description')
        )