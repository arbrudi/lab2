from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
from Models.Developers import Developers

Developers_bp = Blueprint('Developers', __name__)

@Developers_bp.route('/admin/Developer/create', methods=['POST'])
def add_Developers():
    try:
        data = request.get_json()
        icon = data.get('icon')
        name = data.get('name')
        description = data.get('description')

        if not icon:
            return jsonify({'error': "Field 'icon' cannot be null!"}), 400

        new_Developers = Developers(icon=icon, name=name, description=description)
        result = new_Developers.save(current_app.config['MONGO_CLIENT'])  # Pass mongo instance from config
        return jsonify({"_id": str(result.inserted_id), "icon": icon, "name": name, "description": description}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@Developers_bp.route('/admin/Developer', methods=['GET'])
def get_Developers():
    try:
        Developers = current_app.config['MONGO_CLIENT'].db.Developers.find()  # Access the 'features' collection using 'db'
        Developers_data = []
        for Developer in Developers:
            Developer['_id'] = str(Developer['_id'])
            Developers_data.append(Developer)
        return jsonify(Developers_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500



@Developers_bp.route('/admin/Developer/<id>', methods=['GET'])
def get_Developer(id):
    try:
        # Ensure that you are accessing the 'features' collection correctly
        Developer = current_app.config['MONGO_CLIENT'].db.Developers.find_one({"_id": ObjectId(id)})
        if Developer is None:
            return jsonify({'error': 'Developer not found'}), 404
        Developer['_id'] = str(Developer['_id'])
        return jsonify(Developer), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@Developers_bp.route('/admin/Developer/update/<id>', methods=['PUT'])
def update_Developers(id):
    try:
        data = request.get_json()
        icon = data.get('icon')
        name = data.get('name')
        description = data.get('description')

        if not icon:
            return jsonify({'error': "Field 'icon' cannot be null!"}), 400

   
        Developer_collection = current_app.config['MONGO_CLIENT'].db.Developers
        Developer = Developer_collection.find_one({"_id": ObjectId(id)})

        if not Developer:
            return jsonify({'error': 'Developer not found'}), 404

     
        update_data = {}
        if icon is not None:
            update_data['icon'] = icon
        if name is not None:
            update_data['name'] = name
        if description is not None:
            update_data['description'] = description

    
        Developer_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})

        return jsonify({'message': 'Developer updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500




@Developers_bp.route('/admin/Developer/delete/<id>', methods=['DELETE'])
def delete_Developers(id):
    try:
        result = current_app.config['MONGO_CLIENT'].db.Developers.delete_one({"_id": ObjectId(id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Developer not found'}), 404

        return jsonify({'message': 'Developers deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500