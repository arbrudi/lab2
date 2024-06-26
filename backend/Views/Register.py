from flask import Blueprint, request, jsonify
from Models.Users import Users
from extensions import db
from flask_bcrypt import Bcrypt
from cryptography.fernet import Fernet
import base64
import os

bcrypt = Bcrypt()
views_bp = Blueprint('views', __name__)

key = b'_WbwgpS1PDrgCmPcFr557lIHWk3iQYUY5Y7uLWj6NYI='  
cipher_suite = Fernet(key)

def encrypt_password(password):
    encrypted_password = cipher_suite.encrypt(password.encode('utf-8'))
    return base64.urlsafe_b64encode(encrypted_password).decode('utf-8')

def decrypt_password(encrypted_password):
    encrypted_password = base64.urlsafe_b64decode(encrypted_password)
    decrypted_password = cipher_suite.decrypt(encrypted_password).decode('utf-8')
    return decrypted_password

@views_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    required_attr = ['Name', 'Surname', 'User_Role', 'Email', 'Username', 'Password']
    missing_attr = [attr for attr in required_attr if attr not in data or not data[attr]]

    if missing_attr:
        return jsonify({'message': 'Username and password are required'}), 400

    if Users.query.filter_by(Username=data['Username']).first():
        return jsonify({'message': 'Username is already taken'}), 409

    encrypted_password = encrypt_password(data['Password'])
    print("Encrypted Password:", encrypted_password)
   
    new_user = Users(Name=data['Name'], Surname=data['Surname'], User_Role=data['User_Role'],
                    Email=data['Email'], Username=data['Username'], Password=encrypted_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})
