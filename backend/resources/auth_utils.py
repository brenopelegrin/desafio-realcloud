import jwt
import datetime
from server import config

from flask_restful import abort
from flask import request

JWT_SECRET_KEY = config.get("JWT_SECRET_KEY")
JWT_DEFAULT_ALGORITHM = "HS256"

def abort_if_authorization_header_is_invalid(authorization_header):
    decoded_token = None
    
    if not authorization_header:
        abort(401, message="You must pass the JWT token in the Authorization header with the format `Bearer YOURTOKEN`", authenticated=False)
    
    try:
        str(authorization_header)
    except Exception:
        abort(400, message="Unparseable Authorization header", authenticated=False)
        
    if 'Bearer' not in str(authorization_header):  
        abort(400, message="You must pass the JWT token in the Authorization header with the format `Bearer YOURTOKEN`", authenticated=False)
        
    try:
        token = authorization_header.split(' ')[1]
        decoded_token = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_DEFAULT_ALGORITHM])
    except jwt.InvalidTokenError:
        abort(401, message="Invalid JWT token", authenticated=False)
        
    return decoded_token

def google_token_to_JWT(google_token):
    # Extract user details
    user_info = google_token['userinfo']
    user_email = user_info["email"]
    user_name = user_info["name"]
    token_exp = datetime.datetime.utcnow() + datetime.timedelta(hours = 24)  # 24-hour expiry

    # Create a JWT
    jwt_token = jwt.encode(
        {
            "email": user_email,
            "name": user_name,
            "exp": token_exp,
        },
        JWT_SECRET_KEY,
        algorithm=JWT_DEFAULT_ALGORITHM,
    )
    
    return jwt_token

def protected_resource(f):
    def wrapper(self, *args, **kwargs):
        authorization_header = request.headers.get('Authorization')
        decoded_token = abort_if_authorization_header_is_invalid(authorization_header)
        return f(self, *args, **kwargs)
    return wrapper