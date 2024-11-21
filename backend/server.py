from flask import Flask, request, Response
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import DeclarativeBase
from authlib.integrations.flask_client import OAuth

from dotenv import dotenv_values
import os

config = {
    #**dotenv_values(".env.shared"),  # load shared development variables
    #**dotenv_values(".env.secret"),  # load sensitive variables
    **dotenv_values(".env"),
    **os.environ,
}

class Base(DeclarativeBase):
  pass

app = Flask(__name__)

# Get env variables here
app.secret_key = config.get("FLASK_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = config.get("DATABASE_URI")
frontend_url = config.get("FRONTEND_URL")

app.config['GOOGLE_CLIENT_ID'] = config.get("GOOGLE_CLIENT_ID")
app.config['GOOGLE_CLIENT_SECRET'] = config.get("GOOGLE_CLIENT_SECRET")

api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": frontend_url}})

db = SQLAlchemy(model_class=Base)
db.init_app(app)

ma = Marshmallow(app)

oauth = OAuth(app)

oauth.register(
    'google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid profile email'}
)