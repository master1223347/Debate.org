from flask import Blueprint, request, jsonify
from ..firebase import firestore_db
import uuid

room_bp = Blueprint('room', __name__)

@room_bp.route('/createRoom', methods=['POST'])
def create_room():
    """Create debate room, return Jitsi URL"""
    try:
        data = request.get_json()
        format = data.get('format')
        participants = data.get('participants')  # list of user_ids
        if not format or not participants or len(participants) < 2:
            return jsonify({'error': 'Missing or invalid room data'}), 400
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
        return jsonify({'room_id': room_id, 'jitsi_url': jitsi_url}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@room_bp.route('/room/<room_id>', methods=['GET'])
def get_room(room_id):
    """Fetch room metadata"""
    try:
        room_ref = firestore_db.collection('rooms').document(room_id)
        room = room_ref.get()
        if not room.exists:
            return jsonify({'error': 'Room not found'}), 404
        return jsonify({'room': room.to_dict()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@room_bp.route('/endRoom', methods=['POST'])
def end_room():
    """End debate, save winner and feedback"""
    try:
        data = request.get_json()
        room_id = data.get('room_id')
        winner_id = data.get('winner_id')
        feedback = data.get('feedback')  # list of feedback dicts
        if not room_id or not winner_id:
            return jsonify({'error': 'Missing room_id or winner_id'}), 400
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
        return jsonify({'message': 'Room ended and feedback saved'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
