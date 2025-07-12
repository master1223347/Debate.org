# Feedback model for Firestore
class Feedback:
    def __init__(self, feedback_id, user_id, room_id, comments, rating):
        self.feedback_id = feedback_id
        self.user_id = user_id
        self.room_id = room_id
        self.comments = comments
        self.rating = rating

    @staticmethod
    def from_dict(data):
        """Create a Feedback instance from Firestore document dict."""
        return Feedback(
            feedback_id=data.get('feedback_id'),
            user_id=data.get('user_id'),
            room_id=data.get('room_id'),
            comments=data.get('comments'),
            rating=data.get('rating')
        )

    def to_dict(self):
        """Serialize Feedback instance to Firestore document dict."""
        return {
            'feedback_id': self.feedback_id,
            'user_id': self.user_id,
            'room_id': self.room_id,
            'comments': self.comments,
            'rating': self.rating
        }
