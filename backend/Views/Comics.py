from flask import Blueprint, request, jsonify
from Models.Comic import Comics, Comics_Author
from extensions import db

Comics_bp = Blueprint('comics',__name__)


@Comics_bp.route('/admin/comics/create', methods=['POST'])
def add_Comic():
    try:
        data = request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
        new_Comic = Comics(**data) # ** used to unpack each key-value of the dict.
        db.session.add(new_Comic)
        db.session.commit()

        return jsonify(data), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    

@Comics_bp.route('/admin/comics', methods=['GET'])
def get_comics():
    try:
        all_comics = Comics.query.all()
        Comics_data = []
        for Comic in all_comics:
            _data = {
                'Comic_ID':Comic.Comic_ID,
                'Comic_image':Comic.Comic_image,
                'Comic_title': Comic.Comic_title,
                'Comic_type': Comic.Comic_type,
                'Comic_Description': Comic.Comic_Description
            }
            Comics_data.append(_data)

        return jsonify(Comics_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({"error": str(e)}), 500
    

    
    


@Comics_bp.route('/admin/comics/<int:id>', methods=['GET'])
def get_comic(id):
    try:
        comic = Comics.query.get(id)
        if comic is None:
            return jsonify({'error':'Comic not found'}), 404
        
        comic_data = {
               'Comic_ID':comic.Comic_ID,
                'Comic_image':comic.Comic_image,
                'Comic_title': comic.Comic_title,
                'Comic_type': comic.Comic_type,
                'Comic_Description': comic.Comic_Description
        }

        return jsonify(comic_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@Comics_bp.route('/admin/comics/update/<int:id>', methods=['GET', 'POST', 'PUT'])
def update_comic(id):
    try:
        comic = Comics.query.get(id)
        if comic is None:
            return jsonify({'error':'Comic not found'}), 404
        
        data = request.get_json()
        for key, value in data.items():
            setattr(comic, key, value)

        db.session.commit()
        return jsonify({'message': 'Comic updated successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    


    
@Comics_bp.route('/admin/comics/delete/<int:ISBN>', methods=['DELETE'])
def delete_comic(ISBN):
    try:
        comic = Comics.query.get(ISBN)
        if comic is None:
            return jsonify({'error': 'Comic not found'}), 404

        db.session.delete(comic)
        db.session.commit()
        
        return jsonify({'message': 'Comic deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    