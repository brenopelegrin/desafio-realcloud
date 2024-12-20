from flask_restful import reqparse, abort, Api, Resource
from flask import jsonify, render_template, make_response, render_template_string

from server import frontend_url, db

from models.users import User as UserModel
from schemas.users import user_schema, users_schema

from resources.auth_utils import protected_resource
import datetime

allowed_currencies = ['USD']

def abort_if_dob_is_invalid(dob):
    pass

def abort_if_currency_is_not_allowed(currency):
    global allowed_currencies
    message = f"The currency `{currency}` is not allowed"
    if currency not in allowed_currencies:
        abort(400, message=message, allowed_currencies=allowed_currencies) # bad request
    
def abort_if_balance_is_invalid(balance):
    try:
        float(balance)
    except ValueError:  
        abort(400, message="Balance must be a number")
    
    if float(balance) < 0:
        abort(400, message="Balance must be greater than 0")
        
def abort_if_name_is_invalid(name):
    if len(name) < 1:
        abort(400, message="Name must be at least 1 character long")
    if len(name) > 255:
        abort(400, message="Name must be at most 255 characters long")
    if not name.replace(' ', '').isalpha():
        abort(400, message="Name must only contain alphabetical characters")
        
def abort_if_user_doesnt_exist(user_id):
    user = db.session.get(UserModel, user_id)
    if not user:
        abort(404, message="User not found")
    
class AllUsers(Resource):
    @protected_resource
    def get(self):
        all_users = db.session.execute(db.select(UserModel).order_by(UserModel.id)).scalars()
        return users_schema.dump(all_users)
    
    @protected_resource
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True, type=str, help='You need to inform the name', location='json')
        parser.add_argument('balance', required=True, type=float, help='You need to inform the balance', location='json')
        parser.add_argument('currency', required=True, type=str, help='You need to inform the currency', location='json')
        parser.add_argument('dob', required=True, type=str, help='You need to inform the date of birth in format DD/MM/YYYY', location='json')
        args = parser.parse_args()
        
        abort_if_currency_is_not_allowed(currency=args.get('currency'))
        abort_if_balance_is_invalid(balance=args.get('balance'))
        abort_if_name_is_invalid(name=args.get('name'))
        abort_if_dob_is_invalid(dob=args.get('dob'))

        new_user = UserModel(
            name = args.get('name'),
            balance = args.get('balance'),
            currency = args.get('currency'),
            dob = args.get('dob')
        )
        
        try:
            db.session.add(new_user)
            db.session.commit()
            data = user_schema.dump(new_user)
            print(data)
            return data
        except Exception:
            abort(500, message="A server error occured while creating the user")
    
class UserById(Resource):
    @protected_resource
    def get(self, user_id: int):
        abort_if_user_doesnt_exist(user_id=user_id)
        
        user = db.session.get(UserModel, user_id)
        return user_schema.dump(user)
    
    @protected_resource
    def put(self, user_id: int):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=False, type=str, help='Changes the name', location='json')
        parser.add_argument('balance', required=False, help='Changes the balance', location='json')
        parser.add_argument('currency', required=False, type=str, help='Changes the currency', location='json')
        parser.add_argument('dob', required=False, type=str, help='Changes the date of birth', location='json')
        args = parser.parse_args()
        
        abort_if_user_doesnt_exist(user_id=user_id)        
        user = db.session.get(UserModel, user_id)
        
        if args.get('currency'):
            abort_if_currency_is_not_allowed(currency=args.get('currency'))
            user.currency = args.get('currency')
        if args.get('balance'):
            abort_if_balance_is_invalid(balance=args.get('balance'))
            user.balance = args.get('balance')
        if args.get('name'):
            abort_if_name_is_invalid(name=args.get('name'))
            user.name = args.get('name')
        if args.get('dob'):
            abort_if_dob_is_invalid(dob=args.get('dob'))
            user.dob = args.get('dob')
            
        try:
            db.session.commit()
            return user_schema.dump(user)
        except Exception:
            abort(500, message="A server error occured while updating the user")
    
    @protected_resource
    def delete(self, user_id: int):
        abort_if_user_doesnt_exist(user_id=user_id)
        user = db.session.get(UserModel, user_id)
        
        try:
            db.session.delete(user)
            db.session.commit()
            return {"message": f"User with id `{user_id}` deleted with success"}
        except Exception:
            abort(500, message="A server error occured while deleting the user")