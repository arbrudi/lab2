from flask import Blueprint, request, jsonify
from Models.Users import Users
from extensions import db
from flask_bcrypt import Bcrypt
from cryptography.fernet import Fernet
import base64

bcrypt = Bcrypt()
Users_bp = Blueprint('Users', __name__)

key = b'_WbwgpS1PDrgCmPcFr557lIHWk3iQYUY5Y7uLWj6NYI=' 

cipher_suite = Fernet(key)

def decrypt_password(encrypted_password):
    encrypted_password = base64.urlsafe_b64decode(encrypted_password)
    decrypted_password = cipher_suite.decrypt(encrypted_password).decode('utf-8')
    return decrypted_password

def encrypt_password(password):
    encrypted_password = cipher_suite.encrypt(password.encode('utf-8'))
    return base64.urlsafe_b64encode(encrypted_password).decode('utf-8')

@Users_bp.route('/admin/user', methods=['GET'])
def get_users():
    try:
        all_Users = Users.query.all()
        Users_data = []
        for User in all_Users:
            _data = {
                'User_ID': User.User_ID,
                'Name': User.Name,
                'Surname': User.Surname,
                'User_Role': User.User_Role,
                'Email': User.Email,
                'Username': User.Username,
                'Password': User.Password
            }
            Users_data.append(_data)

        return jsonify(Users_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500

@Users_bp.route('/admin/user/<int:User_ID>', methods=['GET'])
def get_user_data(User_ID):
    try:
        user = Users.query.get(User_ID)
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        decrypted_password = decrypt_password(user.Password)

        user_data = {
            'User_ID': user.User_ID,
            'Name': user.Name,
            'Surname': user.Surname,
            'User_Role': user.User_Role,
            'Email': user.Email,
            'Username': user.Username,
            'Password': decrypted_password 
        }

        return jsonify(user_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@Users_bp.route('/admin/user/create', methods=['POST'])
def register():
    data = request.get_json()

    required_attr = ['Name', 'Surname', 'User_Role', 'Email', 'Username', 'Password']
    missing_attr = [attr for attr in required_attr if attr not in data or not data[attr]]

    if missing_attr:
        return jsonify({'message': 'Required fields are missing'}), 400

    if Users.query.filter_by(Username=data['Username']).first():
        return jsonify({'message': 'Username is already taken'}), 409

    encrypted_password = encrypt_password(data['Password'])

    new_user = Users(Name=data['Name'], Surname=data['Surname'], User_Role=data['User_Role'],
                     Email=data['Email'], Username=data['Username'], Password=encrypted_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@Users_bp.route('/admin/user/update/<int:User_ID>', methods=['PUT'])
def update_User(User_ID):
    try:
        user = Users.query.get(User_ID)
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.json
        if 'Password' in data:
            encrypted_password = encrypt_password(data['Password'])
            data['Password'] = encrypted_password
        
        for key, value in data.items():
            setattr(user, key, value)
      
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    



@Users_bp.route('/admin/user/delete/<int:User_ID>', methods=['DELETE'])
def delete_user(User_ID):
    print('userid',User_ID)
    try:
        user = Users.query.get(User_ID)
        print('user i vogel',user)
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        db.session.delete(user)
        db.session.commit()
        
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
