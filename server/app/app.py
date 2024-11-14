from flask import Flask
from app.blueprints.routes import api

app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')

