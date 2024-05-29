from flask import Blueprint, request, jsonify
from Models.Events import Events, Event_Participants
from extensions import db

events_bp = Blueprint('events', __name__)

@events_bp.route('/admin/event/create', methods=['POST'])
def add_event():
    try:
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error': f"Field {key} cannot be null!"}), 400
        new_event = Events(**data)
        db.session.add(new_event)
        db.session.commit()

        return jsonify(data), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@events_bp.route('/admin/events', methods=['GET'])
def get_events():
    try:
        all_events = Events.query.all()
        events_data = []
        for event in all_events:
            _data = {
                'Event_ID': event.Event_ID,
                'Event_title': event.Event_title,
                'Event_image': event.Event_image,
                'Event_description': event.Event_description,
                'Event_date': event.Event_date.strftime("%Y-%m-%d") if event.Event_date else None
            }
            events_data.append(_data)

        return jsonify(events_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500

@events_bp.route('/admin/event/<string:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = Events.query.get(event_id)
        if event is None:
            return jsonify({'error': 'Event not found'}), 404

        event_data = {
            'Event_ID': event.Event_ID,
            'Event_title': event.Event_title,
            'Event_image': event.Event_image,
            'Event_description': event.Event_description,
            'Event_date': event.Event_date.strftime("%Y-%m-%d") if event.Event_date else None
        }

        return jsonify(event_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@events_bp.route('/admin/event/update/<string:event_id>', methods=['GET', 'POST', 'PUT'])
def update_event(event_id):
    try:
        event = Events.query.get(event_id)
        if event is None:
            return jsonify({'error': 'Event not found'}), 404

        data = request.get_json()
        for key, value in data.items():
            setattr(event, key, value)

        db.session.commit()
        return jsonify({'message': 'Event updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@events_bp.route('/admin/event/delete/<string:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        event = Events.query.get(event_id)
        if event is None:
            return jsonify({'error': 'Event not found'}), 404

        db.session.delete(event)
        db.session.commit()

        return jsonify({'message': 'Event deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500 
