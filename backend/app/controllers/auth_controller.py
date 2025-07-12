# AuthController: business logic for authentication
from ..firebase import firestore_db
from ..models.user import User
import uuid

class AuthController:
    @staticmethod
    def signup(name, email, password):
        user_id = str(uuid.uuid4())
        user_doc = {
            'user_id': user_id,
            'name': name,
            'email': email,
            'stats': {},
            'created_at': firestore_db.SERVER_TIMESTAMP
        }
        firestore_db.collection('users').document(user_id).set(user_doc)
        return User.from_dict(user_doc)

    @staticmethod
    def login(email, password):
        users = firestore_db.collection('users').where('email', '==', email).stream()
        user = next((u.to_dict() for u in users), None)
        if not user:
            return None
        return User.from_dict(user)
