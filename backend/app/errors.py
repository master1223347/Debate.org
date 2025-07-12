# Custom error classes and handlers
from flask import jsonify

class APIError(Exception):
    """Custom API error for clean JSON responses."""
    def __init__(self, message, status_code=400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

    def to_response(self):
        return jsonify({'error': self.message}), self.status_code

# Example Flask error handler registration:
def register_error_handlers(app):
    @app.errorhandler(APIError)
    def handle_api_error(error):
        return error.to_response()

# Usage:
# from .errors import register_error_handlers
# register_error_handlers(app)
