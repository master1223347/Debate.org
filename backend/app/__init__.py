from flask import Flask
from flask_cors import CORS
from .config import Config
from .firebase import init_firebase

# Import blueprints
from .routes.auth_routes import auth_bp
from .routes.user_routes import user_bp
from .routes.room_routes import room_bp
from .routes.feedback_routes import feedback_bp
from .routes.matchmaker import matchmaker_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
    init_firebase()

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(room_bp)
    app.register_blueprint(feedback_bp)
    app.register_blueprint(matchmaker_bp)

    return app
