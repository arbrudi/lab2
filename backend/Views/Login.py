from flask import Blueprint, request, jsonify
from Models.Users import db, Users
from flask_bcrypt import Bcrypt
from cryptography.fernet import Fernet
import base64
import jwt

bcrypt = Bcrypt()
auth_bp = Blueprint('auth', __name__)

key = b'_WbwgpS1PDrgCmPcFr557lIHWk3iQYUY5Y7uLWj6NYI='  

cipher_suite = Fernet(key)

def decrypt_password(encrypted_password):
    encrypted_password = base64.urlsafe_b64decode(encrypted_password)
    decrypted_password = cipher_suite.decrypt(encrypted_password).decode('utf-8')
    return decrypted_password

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'Username' not in data or 'Password' not in data:
        return jsonify({'message': 'Username and password are required'}), 400

    username = data['Username']
    password = data['Password']

    user = Users.query.filter_by(Username=username).first()

    if not user:
        return jsonify({'message': 'Invalid username or password'}), 401

    decrypted_password = decrypt_password(user.Password)

    if decrypted_password != password:
        return jsonify({'message': 'Invalid username or password'}), 401

    user_id = user.User_ID
    role = user.User_Role
    
    token_payload = {'user_id': user_id, 'role': role}
    token = jwt.encode(token_payload, 'Ellie', algorithm='HS256')

    return jsonify({'message': 'Login successful', 'user_id': user.User_ID, 'role': user.User_Role, 'token': token })
