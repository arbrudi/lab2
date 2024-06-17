from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
from Models.Sponsors import Sponsors

sponsors_bp = Blueprint('sponsorsBP', __name__)

@sponsors_bp.route('/admin/sponsors/create', methods=['POST'])
def add_sponsors():
    try:
        data = request.get_json()
        logo = data.get('Logo')
        sponsor = data.get('Sponsor_name')
        date = data.get('Joined_on')

        if not logo:
            return jsonify({'error': "Field 'Logo' cannot be null!"}), 400

        new_sponsor = Sponsors(Logo=logo, Sponsor_name=sponsor, Joined_on=date)
        result = new_sponsor.save(current_app.config['MONGO_CLIENT'])  # Pass mongo instance from config
        return jsonify({"_id": str(result.inserted_id), "Logo": logo, "Sponsor_name": sponsor, "Joined_on": date}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@sponsors_bp.route('/admin/sponsors', methods=['GET'])
def get_sponsors():
    try:
        spon = current_app.config['MONGO_CLIENT'].db.sponsors.find()  # Access the 'sponsors' collection using 'db'
        data = []
        for sponsor in spon:
            sponsor['_id'] = str(sponsor['_id'])
            data.append(sponsor)
        return jsonify(data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@sponsors_bp.route('/admin/sponsor/<id>', methods=['GET'])
def get_sponsor(id):
    try:
        sponsor = current_app.config['MONGO_CLIENT'].db.sponsors.find_one({"_id": ObjectId(id)})
        if sponsor is None:
            return jsonify({'error': 'Sponsor not found'}), 404
        sponsor['_id'] = str(sponsor['_id'])
        return jsonify(sponsor), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@sponsors_bp.route('/admin/sponsors/update/<id>', methods=['PUT'])
def update_sponsor(id):
    try:
        data = request.get_json()
        logo = data.get('Logo')
        sponsors = data.get('Sponsor_name')
        date = data.get('Joined_on')

        if not logo:
            return jsonify({'error': "Field 'Logo' cannot be null!"}), 400

   
        collection = current_app.config['MONGO_CLIENT'].db.sponsors
        sponsor = collection.find_one({"_id": ObjectId(id)})

        if not sponsor:
            return jsonify({'error': 'Sponsor not found'}), 404

        update_data = {}
        if logo is not None:
            update_data['Logo'] = logo
        if sponsor is not None:
            update_data['Sponsor_name'] = sponsors
        if date is not None:
            update_data['Joined_on'] = date

    
        collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})

        return jsonify({'message': 'Sponsor updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@sponsors_bp.route('/admin/sponsor/delete/<id>', methods=['DELETE'])
def delete_sponsor(id):
    try:
        result = current_app.config['MONGO_CLIENT'].db.sponsors.delete_one({"_id": ObjectId(id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Sponsor not found'}), 404

        return jsonify({'message': 'Sponsor deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500