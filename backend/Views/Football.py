from flask import Blueprint, request, jsonify
from Models.Football import Team, Player
from extensions import db

foot_bp = Blueprint('foot',__name__)

@foot_bp.route('/team/add', methods=['POST'])
def add_team():
    try:
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
        new_team = Team(**data) 
        print('safasfas',new_team)
        db.session.add(new_team)
        db.session.commit()

        return jsonify(data), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
@foot_bp.route('/player/add', methods=['POST'])
def add_player():
    try:
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
        new_player = Player(**data) 
        db.session.add(new_player)
        db.session.commit()

        return jsonify(data), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500   

@foot_bp.route('/player/year_display/<int:year>', methods=['GET'])
def show_player_year(year):
    try:
        data = Player.query.filter_by(BirthYear=year).all()

        if not data:
            return jsonify({'message': 'No birthyear found.'}), 404
        
        players =[]
        for player in data:
            play ={
                'PlayerId':player.PlayerId,
                'Name':player.Name,
                'Number':player.Number,
                'BirthYear':player.BirthYear,
                'TeamID':player.TeamID
            }
            players.append(play)
        return jsonify(players), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


@foot_bp.route('/player/team_get', methods=['GET'])
def get_team():
    try:
        all_teams = Team.query.all()
        data = []
        for team in all_teams:
            _data = {
                'TeamID':team.TeamID,
                'Name':team.Name
            }
            data.append(_data)

        return jsonify(data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500
    
@foot_bp.route('/team/<int:id>', methods=['GET'])
def get_team_(id):
    try:
        book = Team.query.get(id)
        if book is None:
            return jsonify({'error':'Team not found'}), 404
        
        data = {
            'Name': book.Name,
        }

        return jsonify(data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    

@foot_bp.route('/player/team_name/<team_name>', methods=['GET'])
def display_player_team_name(team_name):
    try:
        # Get the team by name
        team = Team.query.filter_by(Name=team_name).first()
        if not team:
            return jsonify({'message': f'No team found with name {team_name}.'}), 404

        # Get the players for the team
        players = Player.query.filter_by(TeamID=team.TeamID).all()
        if not players:
            return jsonify({'message': f'No players found for team {team_name}.'}), 404

        player_list = []
        for player in players:
            player_info = {
                'PlayerId': player.PlayerId,
                'Name': player.Name,
                'Number': player.Number,
                'BirthYear': player.BirthYear,
                'TeamID': player.TeamID
            }
            player_list.append(player_info)

        return jsonify(player_list), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@foot_bp.route('/team/update/<int:id>', methods=['GET', 'POST', 'PUT'])
def update_team(id):
    try:
        team = Team.query.get(id)
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

