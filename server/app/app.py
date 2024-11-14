from flask import Flask, jsonify
from app.blueprints.routes import api

app = Flask(__name__)
app.secret_key = 'secret_key'
app.register_blueprint(api, url_prefix='/api')

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({'error': str(e)})
