from flask_restful import reqparse, abort, Api, Resource, url_for
from flask import redirect, session, make_response, request

from server import frontend_url, db, oauth

from models.users import User as UserModel
from schemas.users import user_schema, users_schema
from resources.auth_utils import google_token_to_JWT, protected_resource

frontend_oauth_redirect_url = frontend_url + '/oauth2/google/callback'

class GoogleLogin(Resource):
    def get(self):
        redirect_uri = url_for('googlesuccesscallback', _external=True)
        return oauth.google.authorize_redirect(redirect_uri)

class GoogleSuccessCallback(Resource):
    def get(self):
        google_token = oauth.google.authorize_access_token()
        jwt_token = google_token_to_JWT(google_token)
        return redirect(frontend_oauth_redirect_url + f"?token={jwt_token}")
    
class GoogleLogout(Resource):
    def get(self):
        return 200
    
    def post(self):
        return 200
    
class GoogleTestProtected(Resource):
    @protected_resource
    def get(self):
        return {
            "message": "Your token is valid",
            "authenticated": True
        }