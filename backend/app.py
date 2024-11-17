import sys
import os

from server import app, db, api
from routes import setup_api_routes

# Setup routes
setup_api_routes(api)

@app.route('/')
def documentation():
    """_summary_

    Returns:
        _type_: _description_
    """
    return "You can view the server-end documentation on <a href='https://github.com/brenopelegrin/desafio-realcloud/'>GitHub.</a>"

# Create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    # Set up Flask local development server
    # Do NOT use this in production!
    app.run(debug=False, host='0.0.0.0', port='5000')
    
