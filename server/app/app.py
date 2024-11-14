from flask import Flask, jsonify
from app.blueprints.routes import api
from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.register_blueprint(api, url_prefix='/api')

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({'error': str(e)})
