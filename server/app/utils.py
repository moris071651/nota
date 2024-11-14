from app.models import *

def username_exists(username):
    return Database().get_user_by_name(username) is not None

def create_user(username, password):
    return Database().create_user(username, password)