import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import current_app

firebase_app = None
firestore_db = None

def init_firebase():
    global firebase_app, firestore_db
    if not firebase_app:
        cred = credentials.Certificate(current_app.config['FIREBASE_CRED_PATH'])
        firebase_app = firebase_admin.initialize_app(cred)
        firestore_db = firestore.client()
