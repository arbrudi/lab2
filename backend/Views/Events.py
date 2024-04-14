from flask import Blueprint, request, jsonify
from Models.Events import Events, Event_Participants 
from Models.Users import Users
from extensions import db

events_bp = Blueprint('events', __name__)
 



from flask import jsonify

@events_bp.route('/events', methods=['GET'])
def get_all_event_participants():
    try:
        sql = """
            SELECT ep.Event_ID, e.Event_image, e.Event_description, e.Event_date, ep.User_ID, c.Name, c.Surname 
            FROM Event_Participants ep 
            INNER JOIN Events e ON e.Event_ID = ep.Event_ID 
            INNER JOIN Users c ON c.User_ID = ep.User_ID
        """
        participants = db.session.execute(sql)
        participants_data = [{
            'Event_ID': row.Event_ID,
            'Event_image': row.Event_image,
            'Event_description': row.Event_description,
            'Event_date': row.Event_date.strftime("%Y-%m-%d") if row.Event_date else None,
            'User_ID': row.User_ID,
            'Name': row.Name,
            'Surname': row.Surname
        } for row in participants]

        return jsonify(participants_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
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
    


    

