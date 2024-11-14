from app.models import *

def username_exists(username):
    return Database().get_user_by_name(username) is not None

def create_user(username, password):
    user = Database().create_user(username, password)
    return user[0]

def login_user(username, password):
    user = Database().get_user_by_name(username)
    if not user:
        return (None, 'User not found')
    if user[2] != password:
        return (None, 'Incorrect password')
    return (user[0], None)

def get_all_notes(user_id):
    notes = Database().get_all_notes(user_id)
    return [note[1] for note in notes]

def create_note(title, content, user_id):
    note = Database().create_note(title, content, user_id)
    return note[1]

def get_note_by_title(title, user_id):
    note = Database().get_note_by_title(title, user_id)
    return note[2] if note else None