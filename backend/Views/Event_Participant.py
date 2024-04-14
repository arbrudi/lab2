from flask import Blueprint, request, jsonify
from Models.Events import Events, Event_Participants
from extensions import db
from Models.Users import Users
eventp_bp = Blueprint('eventp',__name__)

@eventp_bp.route('/admin/event_participant/create', methods=['POST'])
def add_event_participant():
    try:
        data = request.get_json()
        event_id = data.get('Event_ID')
        user_id = data.get('User_ID')

        # Debugging statements
        print("Event_ID:", event_id)
        print("User_ID:", user_id)

        # Check if event_id and user_id are provided
        if not event_id or not user_id:
            return jsonify({'error': 'Event_ID and User_ID are required fields.'}), 400

        # Check if the user exists in the Users table
        user = Users.query.filter_by(User_ID=user_id).first()
        if not user:
            return jsonify({'error': 'User with provided User_ID does not exist.'}), 404

        # Create a new event participant entry
        new_participant = Event_Participants(Event_ID=event_id, User_ID=user_id)
        db.session.add(new_participant)
        db.session.commit()

        return jsonify({'message': 'Event participant added successfully.'}), 201

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)}), 500

@eventp_bp.route('/admin/event_participant', methods=['GET'])
def get_book_genres():
    try:
        all_participants = Event_Participants.query.all()
        participant_data=[]
        for participant in all_participants:
            _data = {
                'Event_ID':participant.Event_ID,
                'User_ID':participant.User_ID 
            }
            participant_data.append(_data)
        return jsonify(participant_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({'error':str(e)}), 500

@eventp_bp.route('/admin/event_participant/<int:Event_ID>', methods=['GET'])
def get_event_participant(id):
    try:
        participant = Event_Participants.query.get(id)
        if participant is None:
            return jsonify({'error':'Participant not found!'}), 404

        participant_data={
                'Event_ID':participant.Event_ID,
                'User_ID':participant.User_ID 
        }
        return jsonify(participant_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@eventp_bp.route('/admin/evenr_participant/update/<int:Event_ID>', methods =['GET', 'POST', 'PUT'])
def update_event_participant(id):
    try:
        participant = Event_Participants.query.get(id)
        if participant is None:
            return jsonify({'error':'Participant not found!'})

        data = request.get_json()
        for key, value in data.items():
            setattr(participant, key, value)

        db.session.commit()
        return jsonify({'message':'Participant updated successfully!'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error":str(e)}), 500

@eventp_bp.route('/admin/event_participant/delete/<int:Event_ID>', methods=['DELETE'])
def delete_event_participant(id):
    try:
        participant = Event_Participants.quety.get(id)
        if participant is None:
            return jsonify({'error':'Participant not found!'}), 404

        db.session.delete(participant)
        db.session.commit()

        return jsonify({'message':'Participant deleted successfully!'}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500