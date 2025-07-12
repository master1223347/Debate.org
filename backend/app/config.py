import os

class Config:
    """Flask app configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev')
    FIREBASE_CRED_PATH = os.environ.get('FIREBASE_CRED_PATH', 'serviceAccount.json')
    # Add more config options as needed

    @staticmethod
    def init_app(app):
        """Optional: Initialize app with config (logging, etc)."""
        pass

# Usage:
# app.config.from_object(Config)
# Config.init_app(app)
