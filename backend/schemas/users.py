from models.users import User as UserModel
from server import ma

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = UserModel
    
    id = ma.auto_field()
    name = ma.auto_field()
    balance = ma.auto_field()
    currency = ma.auto_field()
    dob = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()


user_schema = UserSchema()
users_schema = UserSchema(many=True)