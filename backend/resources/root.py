from flask import make_response
from flask_restful import Resource

class HealthCheck(Resource):
    def get(self):
        return {"healthy": True}
    
class Root(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(
            "You can view the backend documentation on <a href='https://github.com/brenopelegrin/desafio-realcloud/'>GitHub.</a>",
            headers
        )