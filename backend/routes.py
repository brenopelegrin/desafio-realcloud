from resources.users import UserById, AllUsers
from resources.root import HealthCheck, Root
from resources.oauth2.google import (
    GoogleLogin, 
    GoogleSuccessCallback, 
    GoogleLogout,
    GoogleTestProtected
)

def setup_api_routes(api):
    # Root resources
    api.add_resource(Root, '/')
    api.add_resource(HealthCheck, '/health')
    
    # User resources
    api.add_resource(UserById, '/users/<int:user_id>')
    api.add_resource(AllUsers, '/users')
    
    # OAuth2 resources
    api.add_resource(GoogleLogin, '/oauth2/google/authorize')
    api.add_resource(GoogleSuccessCallback, '/oauth2/google/callback')
    api.add_resource(GoogleLogout, '/oauth2/google/logout')
    api.add_resource(GoogleTestProtected, '/oauth2/google/protected')
    