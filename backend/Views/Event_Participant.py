from flask import Blueprint, request, jsonify
from Models.Events import Events, Event_Participants
from extensions import db
from Models.Users import Users

eventp_bp = Blueprint('eventp', __name__)

@eventp_bp.route('/admin/event_participant/create', methods=['POST'])
def add_event_participant():
    try:
        data = request.get_json()
        event_id = data.get('Event_ID')
        user_id = data.get('User_ID')

        if not event_id or not user_id:
            return jsonify({'error': 'Event_ID and User_ID are required fields.'}), 400

        # Check if the user exists
        user = Users.query.get(user_id)
        if not user:
            return jsonify({'error': 'User with provided User_ID does not exist.'}), 404

        # Check if the event exists
        event = Events.query.get(event_id)
        if not event:
            return jsonify({'error': 'Event with provided Event_ID does not exist.'}), 404

        # Create a new event participant entry
        new_participant = Event_Participants(Event_ID=event_id, User_ID=user_id)
        db.session.add(new_participant)
        db.session.commit()

        return jsonify({'message': 'Event participant added successfully.'}), 201

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)}), 500

@eventp_bp.route('/admin/event_participant/delete/<string:Event_ID>/<int:User_ID>', methods=['DELETE'])
def delete_event_participant(Event_ID, User_ID):
    try:
        participant = Event_Participants.query.filter_by(Event_ID=Event_ID, User_ID=User_ID).first()
        if not participant:
            return jsonify({'error': 'Participant not found!'}), 404

        db.session.delete(participant)
        db.session.commit()

        return jsonify({'message': 'Participant deleted successfully.'}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

@eventp_bp.route('/admin/event_participant', methods=['GET'])
def get_all_event_participants():
    try:
        participants = Event_Participants.query.all()
        participant_data = [{'Event_ID': p.Event_ID, 'User_ID': p.User_ID} for p in participants]
        return jsonify(participant_data), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

@eventp_bp.route('/admin/event_participant/<string:Event_ID>/<int:User_ID>', methods=['GET'])
def get_event_participant(Event_ID, User_ID):
    try:
        participant = Event_Participants.query.filter_by(Event_ID=Event_ID, User_ID=User_ID).first()
        if not participant:
            return jsonify({'error': 'Participant not found!'}), 404

        participant_data = {'Event_ID': participant.Event_ID, 'User_ID': participant.User_ID}
        return jsonify(participant_data), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500 