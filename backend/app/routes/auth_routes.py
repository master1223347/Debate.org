from flask import Blueprint, request, jsonify
from ..firebase import firestore_db
import uuid

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    """Register user, save profile in Firestore"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')  # For demo only; use Firebase Auth for real auth
        if not name or not email or not password:
            return jsonify({'error': 'Missing required fields'}), 400
        user_id = str(uuid.uuid4())
        user_doc = {
            'user_id': user_id,
            'name': name,
            'email': email,
            'stats': {},
            'created_at': firestore_db.SERVER_TIMESTAMP
        }
        firestore_db.collection('users').document(user_id).set(user_doc)
        return jsonify({'message': 'User registered', 'user_id': user_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate and return user info (stub; use Firebase Auth client-side for real apps)"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400
        # For demo: search Firestore for user with matching email
        users = firestore_db.collection('users').where('email', '==', email).stream()
        user = next((u.to_dict() for u in users), None)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        # Do NOT check password here in production; use Firebase Auth
        return jsonify({'message': 'Login successful', 'user': user}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
