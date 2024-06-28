from flask import Blueprint, request, jsonify
from Models.Group import Groupi, Member
from extensions import db

foot_bp = Blueprint('foot',__name__)

@foot_bp.route('/group/add', methods=['POST'])
def add_group():
    try:
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
        new_team = Groupi(**data) 
        db.session.add(new_team)
        db.session.commit()

        return jsonify(data), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
@foot_bp.route('/member/add', methods=['POST'])
def add_member():
    try:
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
        new_player = Member(**data) 
        db.session.add(new_player)
        db.session.commit()

        return jsonify(data), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500   

@foot_bp.route('/player/group_get', methods=['GET'])
def get_group():
    try:
        all_teams = Groupi.query.all()
        data = []
        for team in all_teams:
            _data = {
                'GroupID':team.GroupID,
                'GroupName':team.GroupName,
                'Description': team.Description
            }
            data.append(_data)

        return jsonify(data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500
    
@foot_bp.route('/player/group_members', methods=['GET'])
def get_members():
    try:
        all_members = Member.query.all()
        data = []
        for team in all_members:
            _data = {
                'MemberID':team.MemberID,
                'Name':team.Name,
                'Role': team.Role,
                'GroupID':team.GroupID
            }
            data.append(_data)

        return jsonify(data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500
    
    
@foot_bp.route('/group/<int:id>', methods=['GET'])
def get_group_(id):
    try:
        book = Groupi.query.get(id)
        if book is None:
            return jsonify({'error':'Team not found'}), 404
        
        data = {
            'GroupName': book.GroupName,
            'Description':book.Description
        }
        print('hehehehe',data)
        return jsonify(data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@foot_bp.route('/team/update/<int:id>', methods=['GET', 'POST', 'PUT'])
def update_group(id):
    try:
        team = Groupi.query.get(id)
        if team is None:
            return jsonify({'error':'team not found'}), 404
        
        data = request.get_json()
        for key, value in data.items():
            setattr(team, key, value)

        db.session.commit()
        return jsonify({'message': 'team updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


@foot_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete_member(id):
    try:
        book = Member.query.get(id)
        if book is None:
            return jsonify({'error': 'Book not found'}), 404

        db.session.delete(book)
        db.session.commit()
        
        return jsonify({'message': 'Book deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        db.session.rollback()  # Rollback the session to avoid leaving the database in an inconsistent state
        return jsonify({"error": "An unexpected error occurred while deleting the book"}), 500
