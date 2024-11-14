from flask import *
from app.utils import *

api = Blueprint('api', __name__)

# make check for session login
@api.before_request
def check_login():
    if request.endpoint == 'api.login' or request.endpoint == 'api.register':
        return
    if not session.get('logged_in') or not session['logged_in']:
        return jsonify({'error': 'Not logged in'})

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data:
        session['logged_in'] = False
        return jsonify({'error': 'No data provided'})
    if not data.get('username') or not data.get('password'):
        session['logged_in'] = False
        return jsonify({'error': 'Missing username or password'})
    if username_exists(data.get('username')):
        session['logged_in'] = False
        return jsonify({'error': 'Username already exists'})
    create_user(data.get('username'), data.get('password'))
    session['logged_in'] = True
    return jsonify({'success': 'User created'})

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        session['logged_in'] = False
        return jsonify({'error': 'No data provided'})
    if not data.get('username') or not data.get('password'):
        session['logged_in'] = False
        return jsonify({'error': 'Missing username or password'})
    err = login_user(data.get('username'), data.get('password'))
    if err:
        session['logged_in'] = False
        return jsonify({'error': err})
    session['logged_in'] = True
    return jsonify({'success': 'Logged in'})

@api.route('/logout', methods=['POST'])
def logout():
    session['logged_in'] = False
    return jsonify({'success': 'Logged out'})
