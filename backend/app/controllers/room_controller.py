# RoomController: business logic for room operations
from ..firebase import firestore_db
from ..models.room import Room
import uuid

class RoomController:
    @staticmethod
    def create_room(format, participants):
        room_id = str(uuid.uuid4())
        jitsi_url = f'https://meet.jit.si/{room_id}'
        room_doc = {
            'room_id': room_id,
            'format': format,
            'participants': participants,
            'jitsi_url': jitsi_url,
            'status': 'active',
            'created_at': firestore_db.SERVER_TIMESTAMP
        }
        firestore_db.collection('rooms').document(room_id).set(room_doc)
        return Room.from_dict(room_doc)

    @staticmethod
    def get_room(room_id):
        room_ref = firestore_db.collection('rooms').document(room_id)
        room = room_ref.get()
        if not room.exists:
            return None
        return Room.from_dict(room.to_dict())

    @staticmethod
    def end_room(room_id, winner_id, feedback=None):
        room_ref = firestore_db.collection('rooms').document(room_id)
        room_ref.update({'status': 'ended', 'winner_id': winner_id})
        # Optionally save feedback
        if feedback:
            for fb in feedback:
                fb_id = str(uuid.uuid4())
                fb_doc = {
                    'feedback_id': fb_id,
                    'room_id': room_id,
                    'user_id': fb.get('user_id'),
                    'comments': fb.get('comments'),
                    'rating': fb.get('rating'),
                    'created_at': firestore_db.SERVER_TIMESTAMP
                }
                firestore_db.collection('feedback').document(fb_id).set(fb_doc)
        return True
