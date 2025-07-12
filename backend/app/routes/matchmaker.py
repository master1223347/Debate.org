from flask import Blueprint, request, jsonify
from ..firebase import firestore_db
import uuid

matchmaker_bp = Blueprint('matchmaker', __name__)

@matchmaker_bp.route('/matchmake', methods=['POST'])
def matchmake():
    """Add to match pool and auto-pair"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        format = data.get('format', 'LD')
        if not user_id:
            return jsonify({'error': 'Missing user_id'}), 400
        # Add user to matchQueue
        queue_ref = firestore_db.collection('matchQueue')
        queue_ref.document(user_id).set({'user_id': user_id, 'format': format, 'joined_at': firestore_db.SERVER_TIMESTAMP})
        # Try to find another user to pair
        queue_users = [u.to_dict() for u in queue_ref.where('format', '==', format).stream()]
        if len(queue_users) >= 2:
            # Pair first two users
            pair = queue_users[:2]
            room_id = str(uuid.uuid4())
            jitsi_url = f'https://meet.jit.si/{room_id}'
            room_doc = {
                'room_id': room_id,
                'format': format,
                'participants': [pair[0]['user_id'], pair[1]['user_id']],
                'jitsi_url': jitsi_url,
                'status': 'active',
                'created_at': firestore_db.SERVER_TIMESTAMP
            }
            firestore_db.collection('rooms').document(room_id).set(room_doc)
            # Remove paired users from queue
            queue_ref.document(pair[0]['user_id']).delete()
            queue_ref.document(pair[1]['user_id']).delete()
            return jsonify({'paired': True, 'room_id': room_id, 'jitsi_url': jitsi_url, 'users': [pair[0]['user_id'], pair[1]['user_id']]}), 200
        else:
            return jsonify({'paired': False, 'message': 'Waiting for opponent'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
