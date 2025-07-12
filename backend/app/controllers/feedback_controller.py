# FeedbackController: business logic for feedback operations
from ..firebase import firestore_db
from ..models.feedback import Feedback
import uuid

class FeedbackController:
    @staticmethod
    def submit_feedback(user_id, room_id, comments, rating):
        feedback_id = str(uuid.uuid4())
        feedback_doc = {
            'feedback_id': feedback_id,
            'user_id': user_id,
            'room_id': room_id,
            'comments': comments,
            'rating': rating,
            'created_at': firestore_db.SERVER_TIMESTAMP
        }
        firestore_db.collection('feedback').document(feedback_id).set(feedback_doc)
        return Feedback.from_dict(feedback_doc)

    @staticmethod
    def get_feedback(user_id):
        feedbacks = firestore_db.collection('feedback').where('user_id', '==', user_id).stream()
        return [Feedback.from_dict(fb.to_dict()) for fb in feedbacks]
