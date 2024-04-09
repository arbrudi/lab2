from flask import Blueprint, request, jsonify
from Models.Users import db, Users
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
views_bp = Blueprint('views', __name__)



@views_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    required_attr = ['Name', 'Surname', 'User_Role', 'Email', 'Username', 'Password']
    missing_attr = [attr for attr in required_attr if attr not in data or not data[attr]]

    if missing_attr:
        return jsonify({'message': 'Username and password are required'}), 400

    if Users.query.filter_by(Username=data['Username']).first():
        return jsonify({'message': 'Username is already taken'}), 409

    hashed_password = bcrypt.generate_password_hash(data['Password']).decode('utf-8')
   
    new_user = Users(Name=data['Name'], Surname=data['Surname'], User_Role=data['User_Role'],
                    Email=data['Email'], Username=data['Username'], Password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})
