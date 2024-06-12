from flask import Blueprint, request, jsonify, current_app
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
from Models.Features import Features

features_bp = Blueprint('features', __name__)

@features_bp.route('/admin/feature/create', methods=['POST'])
def add_feature():
    try:
        data = request.get_json()
        icon = data.get('icon')
        name = data.get('name')
        description = data.get('description')

        if not icon:
            return jsonify({'error': "Field 'icon' cannot be null!"}), 400

        new_feature = Features(icon=icon, name=name, description=description)
        result = new_feature.save(current_app.config['MONGO_CLIENT'])  # Pass mongo instance from config
        return jsonify({"_id": str(result.inserted_id), "icon": icon, "name": name, "description": description}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@features_bp.route('/admin/features', methods=['GET'])
def get_features():
    try:
        features = current_app.config['MONGO_CLIENT'].db.features.find()  # Access the 'features' collection using 'db'
        features_data = []
        for feature in features:
            feature['_id'] = str(feature['_id'])
            features_data.append(feature)
        return jsonify(features_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@features_bp.route('/admin/feature/<id>', methods=['GET'])
def get_feature(id):
    try:
        # Ensure that you are accessing the 'features' collection correctly
        feature = current_app.config['MONGO_CLIENT'].db.features.find_one({"_id": ObjectId(id)})
        if feature is None:
            return jsonify({'error': 'Feature not found'}), 404
        feature['_id'] = str(feature['_id'])
        return jsonify(feature), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@features_bp.route('/admin/feature/update/<id>', methods=['PUT'])
def update_feature(id):
    try:
        data = request.get_json()
        icon = data.get('icon')
        name = data.get('name')
        description = data.get('description')

        if not icon:
            return jsonify({'error': "Field 'icon' cannot be null!"}), 400

   
        feature_collection = current_app.config['MONGO_CLIENT'].db.features
        feature = feature_collection.find_one({"_id": ObjectId(id)})

        if not feature:
            return jsonify({'error': 'Feature not found'}), 404

     
        update_data = {}
        if icon is not None:
            update_data['icon'] = icon
        if name is not None:
            update_data['name'] = name
        if description is not None:
            update_data['description'] = description

    
        feature_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})

        return jsonify({'message': 'Feature updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@features_bp.route('/admin/feature/delete/<id>', methods=['DELETE'])
def delete_feature(id):
    try:
        result = current_app.config['MONGO_CLIENT'].db.features.delete_one({"_id": ObjectId(id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Feature not found'}), 404

        return jsonify({'message': 'Feature deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500