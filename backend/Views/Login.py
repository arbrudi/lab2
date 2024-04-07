from flask import Blueprint, request, jsonify
from Models.Users import db, Users
from flask_bcrypt import Bcrypt
import jwt

bcrypt = Bcrypt()
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'Username' not in data or 'Password' not in data:
        return jsonify({'message': 'Username and password are required'}), 400

    username = data['Username']
    password = data['Password']

    user = Users.query.filter_by(Username=username).first()

    if not user or not bcrypt.check_password_hash(user.Password, password):
        return jsonify({'message': 'Invalid username or password'}), 401

    # You may want to use a better token generation method in production
    user_id = user.User_ID
    role = user.User_Role
    

    # Generate JWT token
    token_payload = {'user_id': user_id, 'role': role}
    token = jwt.encode(token_payload, 'Ellie', algorithm='HS256')
   
    return jsonify({'message': 'Login successful', 'user_id': user.User_ID, 'role':user.User_Role ,'token': token }) 

   
  