# User model for Firestore
class User:
    def __init__(self, user_id, name, email, stats=None):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.stats = stats or {}

    @staticmethod
    def from_dict(data):
        """Create a User instance from Firestore document dict."""
        return User(
            user_id=data.get('user_id'),
            name=data.get('name'),
            email=data.get('email'),
            stats=data.get('stats', {})
        )

    def to_dict(self):
        """Serialize User instance to Firestore document dict."""
        return {
            'user_id': self.user_id,
            'name': self.name,
            'email': self.email,
            'stats': self.stats
        }
