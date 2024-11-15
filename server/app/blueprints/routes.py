from flask import *
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from utils import *

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
        session['user_id'] = None
        return jsonify({'error': 'No data provided'})
    if not data.get('username') or not data.get('password'):
        session['logged_in'] = False
        session['user_id'] = None
        return jsonify({'error': 'Missing username or password'})
    if username_exists(data.get('username')):
        session['logged_in'] = False
        session['user_id'] = None
        return jsonify({'error': 'Username already exists'})
    user_id = create_user(data.get('username'), data.get('password'))
    session['logged_in'] = True
    session['user_id'] = user_id
    return jsonify({'success': 'User created'})

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        session['logged_in'] = False
        session['user_id'] = None
        return jsonify({'error': 'No data provided'})
    if not data.get('username') or not data.get('password'):
        session['logged_in'] = False
        session['user_id'] = None
        return jsonify({'error': 'Missing username or password'})
    err = login_user(data.get('username'), data.get('password'))
    if err[1] != None:
        session['logged_in'] = False
        session['user_id'] = None
        return jsonify({'error': err[1]})
    session['logged_in'] = True
    session['user_id'] = err[0]
    return jsonify({'success': 'Logged in'})

@api.route('/logout', methods=['POST'])
def logout():
    session['logged_in'] = False
    session['user_id'] = None
    return jsonify({'success': 'Logged out'})

@api.route('/note', methods=['POST', 'GET'])
def note():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'})
        if not data.get('title') or not data.get('content'):
            return jsonify({'error': 'Missing title or content'})
        note = create_note(data.get('title'), data.get('content'), session['user_id'])
        return jsonify({'success': 'Note created', 'note': note})
    elif request.method == 'GET':
        id = request.args.get('id')
        if not id:
            return jsonify({'error': 'No id provided'})
        note = get_note_by_id(id, session['user_id'])
        return jsonify({'note': note})
    
@api.route('/notes', methods=['GET'])
def notes():
    notes = get_all_notes(session['user_id'])
    return jsonify({'notes': notes})

@api.route('/update_note', methods=['POST', 'GET'])
def update_note():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'})
        if not data.get('title') or not data.get('content') or not data.get('id'):
            return jsonify({'error': 'Missing title or content or id'})
        note = update_note_by_id(data.get('id'), data.get('title'), data.get('content'), session['user_id'])
        return jsonify({'success': 'Note updated', 'note': note})
    elif request.method == 'GET':
        id = request.args.get('id')
        if not id:
            return jsonify({'error': 'No title provided'})
        note = delete_note_by_id(id, session['user_id'])
        return jsonify({'success': 'Note deleted', 'note': note})
