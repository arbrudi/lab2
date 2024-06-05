from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

features_bp = Blueprint('features', __name__)

# Assuming you have already configured MongoDB
mongo = PyMongo()

@features_bp.route('/admin/feature/create', methods=['POST'])
def add_feature():
    try:
        data = request.get_json()
        icon = data.get('icon')
        name = data.get('name')
        description = data.get('description')

        if not icon:
            return jsonify({'error': "Field 'icon' cannot be null!"}), 400

        new_feature = {
            "icon": icon,
            "name": name,
            "description": description
        }
        result = mongo.db.features.insert_one(new_feature)

        return jsonify({"_id": str(result.inserted_id), **new_feature}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@features_bp.route('/admin/features', methods=['GET'])
def get_features():
    try:
        features = mongo.db.features.find()
        features_data = []
        for feature in features:
            feature['_id'] = str(feature['_id'])
            features_data.append(feature)
        return jsonify(features_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500

@features_bp.route('/admin/feature/<id>', methods=['GET'])
def get_feature(id):
    try:
        feature = mongo.db.features.find_one({"_id": ObjectId(id)})
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
        updated_data = {}
        for key, value in data.items():
            if value is not None:
                updated_data[key] = value

        result = mongo.db.features.update_one({"_id": ObjectId(id)}, {"$set": updated_data})

        if result.matched_count == 0:
            return jsonify({'error': 'Feature not found'}), 404

        return jsonify({'message': 'Feature updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@features_bp.route('/admin/feature/delete/<id>', methods=['DELETE'])
def delete_feature(id):
    try:
        result = mongo.db.features.delete_one({"_id": ObjectId(id)})

        if result.deleted_count == 0:
            return jsonify({'error': 'Feature not found'}), 404

        return jsonify({'message': 'Feature deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
