# Helper functions for backend
import logging
from flask import jsonify

def log_error(error):
    """Log error to console (extend for external logging)."""
    logging.error(str(error))


def json_response(data=None, error=None, status=200):
    """Return a clean JSON response."""
    if error:
        return jsonify({'error': str(error)}), status
    return jsonify(data or {}), status
