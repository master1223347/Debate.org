# UserController: business logic for user operations
from ..firebase import firestore_db
from ..models.user import User

class UserController:
    @staticmethod
    def get_user(user_id):
        user_ref = firestore_db.collection('users').document(user_id)
        user = user_ref.get()
        if not user.exists:
            return None
        return User.from_dict(user.to_dict())

    @staticmethod
    def get_user_history(user_id):
        rooms = firestore_db.collection('rooms').where('participants', 'array_contains', user_id).stream()
        return [room.to_dict() for room in rooms]

    @staticmethod
    def get_leaderboard(format='LD', limit=10):
        lb_ref = firestore_db.collection('leaderboard').where('format', '==', format).order_by('rating', direction='DESCENDING').limit(limit)
        return [entry.to_dict() for entry in lb_ref.stream()]
