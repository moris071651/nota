import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from blueprints.routes import api

env_path = os.path.join(os.path.dirname(__file__), '../../.env')
env_path = os.path.abspath(env_path)
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.register_blueprint(api, url_prefix='/api')

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)
