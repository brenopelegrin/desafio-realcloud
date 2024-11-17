from flask import Flask, request, Response
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import DeclarativeBase

from dotenv import dotenv_values

config = {
    #**dotenv_values(".env.shared"),  # load shared development variables
    #**dotenv_values(".env.secret"),  # load sensitive variables
    **dotenv_values(".env"),
}

class Base(DeclarativeBase):
  pass

app = Flask(__name__)

# Get env variables here
app.config["SQLALCHEMY_DATABASE_URI"] = config.get("DATABASE_URI")
frontend_url = config.get("FRONTEND_URL")

api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": frontend_url}})

db = SQLAlchemy(model_class=Base)
db.init_app(app)

ma = Marshmallow(app)

with app.app_context():
    db.create_all()