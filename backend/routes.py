from resources.users import UserById, AllUsers
from resources.root import HealthCheck, Root

def setup_api_routes(api):
    api.add_resource(Root, '/')
    api.add_resource(HealthCheck, '/health')
    api.add_resource(UserById, '/users/<int:user_id>')
    api.add_resource(AllUsers, '/users')