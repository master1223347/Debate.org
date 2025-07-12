from flask import Blueprint, request, jsonify
from ..firebase import firestore_db
import uuid

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/submitFeedback', methods=['POST'])
def submit_feedback():
    """Save feedback after debate"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        room_id = data.get('room_id')
        comments = data.get('comments')
        rating = data.get('rating')
        if not user_id or not room_id or rating is None:
            return jsonify({'error': 'Missing required fields'}), 400
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
        return jsonify({'message': 'Feedback submitted', 'feedback_id': feedback_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@feedback_bp.route('/feedback/<user_id>', methods=['GET'])
def get_feedback(user_id):
    """View feedback received"""
    try:
        feedbacks = firestore_db.collection('feedback').where('user_id', '==', user_id).stream()
        feedback_list = [fb.to_dict() for fb in feedbacks]
        return jsonify({'feedback': feedback_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
