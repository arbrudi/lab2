from flask import Blueprint, request, jsonify
from Models.Users import Users
from extensions import db
from flask_bcrypt import Bcrypt


bcrypt = Bcrypt()
Users_bp = Blueprint('Users', __name__)


@Users_bp.route('/admin/user', methods=['GET'])
def get_users():
    try:
        all_Users = Users.query.all()
        Users_data = []
        for User in all_Users:
            _data = {
                'User_ID':User.User_ID,
                'Name':User.Name,
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
def get_user(User_ID):
    try:
        Users = Users.query.get(User_ID)
        if Users is None:
            return jsonify({'error':'User not found'}), 404
        
        user_data = {
                'Name':Users.Name,
                'Surname': Users.Surname,
                'User_Role': Users.User_Role,
                'Email': Users.Email,
                'Username': Users.Username,
                'Password': Users.Password
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
        return jsonify({'message': 'Username and password are required'}), 400

    if Users.query.filter_by(Username=data['Username']).first():
        return jsonify({'message': 'Username is already taken'}), 409

    hashed_password = bcrypt.generate_password_hash(data['Password']).decode('utf-8')
   
    new_user = Users(Name=data['Name'], Surname=data['Surname'], User_Role=data['User_Role'],
                    Email=data['Email'], Username=data['Username'], Password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})



@Users_bp.route('/admin/user/update/<int:User_ID>', methods=['PUT'])
def update_User(User_ID):
    try:
        user = Users.query.get(User_ID)
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.json
        # Check if the 'Password' field is present in the request data
        if 'Password' in data:
            # Hash the password before storing it
            hashed_password = bcrypt.generate_password_hash(data['Password']).decode('utf-8')
            data['Password'] = hashed_password
        
        # Update user attributes based on the received data
        for key, value in data.items():
            setattr(user, key, value)
      
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@Users_bp.route('/admin/user/delete/<int:User_ID>', methods=['DELETE'])
def delete_user(User_ID):
    try:
        user = Users.query.get(User_ID)
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        db.session.delete(user)
        db.session.commit()
        
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

