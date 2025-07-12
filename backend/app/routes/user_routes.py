from flask import Blueprint, jsonify, request
from ..firebase import firestore_db

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    """Fetch profile, stats, etc."""
    try:
        user_ref = firestore_db.collection('users').document(user_id)
        user = user_ref.get()
        if not user.exists:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({'user': user.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_bp.route('/userHistory/<user_id>', methods=['GET'])
def user_history(user_id):
    """Fetch past debates"""
    try:
        rooms = firestore_db.collection('rooms').where('participants', 'array_contains', user_id).stream()
        history = [room.to_dict() for room in rooms]
        return jsonify({'history': history}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_bp.route('/leaderboard', methods=['GET'])
def leaderboard():
    """Return top debaters"""
    try:
        format = request.args.get('format', 'LD')
        lb_ref = firestore_db.collection('leaderboard').where('format', '==', format).order_by('rating', direction='DESCENDING').limit(10)
        leaders = [entry.to_dict() for entry in lb_ref.stream()]
        return jsonify({'leaderboard': leaders}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
