from flask import *
from app.utils import *

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'})
    if not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Missing username or password'})
    if username_exists(data.get('username')):
        return jsonify({'error': 'Username already exists'})
    create_user(data.get('username'), data.get('password'))
    return jsonify({'success': 'User created'})