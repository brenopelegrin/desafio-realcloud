from flask_restful import reqparse, abort, Api, Resource
from flask import jsonify, render_template, make_response, render_template_string

from server import frontend_url, db

from models.users import User as UserModel
from schemas.users import user_schema, users_schema

class GoogleAuthorize(Resource):
    pass

class GoogleCallback(Resource):
    pass