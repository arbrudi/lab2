from flask import Blueprint, request, jsonify
from Models.Comic import  Comics_Author
from extensions import db


ComicsA_bp = Blueprint('comicsA',__name__)


@ComicsA_bp.route('/admin/comics_Author/create', methods=['POST'])
def add_Comics_Author():
    try:
        data= request.get_json()
        for key, value in data.items():
            if value is None:
                return jsonify({'error':f"Field {key} cannot be null!"}), 400
            new_Author =Comics_Author(**data)
            db.session.add(new_Author)
            db.session.commit()

            return jsonify(data), 201
    except Exception as e:
        print('Error', e)
        return jsonify({'error': str(e)}), 500
    

@ComicsA_bp.route('/admin/Comics_Author', methods=['GET'])
def get_Comics_Author():
    try:
        all_Authors = Comics_Author.query.all()
        Authors_data=[]
        for Authors in all_Authors:
            _data = {
                'Comics_Author_ID':Authors.Comics_Author_ID,
                'Author_Name':Authors.Author_Name,
                'Author_notes':Authors.Author_notes
            }
            Authors_data.append(_data)
        return jsonify(Authors_data), 200
    except Exception as e:
        print("Error: ", e)
        return jsonify({'error':str(e)}), 500
    

@ComicsA_bp.route('/admin/comics_Author/<int:id>', methods=['GET'])
def get_comic_ID(id):
    try:
        comic = Comics_Author.query.get(id)
        if comic is None:
            return jsonify({'error':'Comic not found'}), 404
        
        comic_data = {    
               'Comics_Author_ID':comic.Comics_Author_ID,
                'Author_Name': comic.Author_Name,
                'Author_notes': comic.Author_notes
        }

        return jsonify(comic_data), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    

@ComicsA_bp.route('/admin/comics_Author/update/<int:id>', methods=['GET', 'POST', 'PUT'])
def update_comic_Author(id):
    try:
        comic = Comics_Author.query.get(id)
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
    
@ComicsA_bp.route('/admin/comics_Authors/delete/<int:Comics_Author_ID>', methods=['DELETE'])
def delete_comic_author(Comics_Author_ID):
    try:
        comic = Comics_Author.query.get(Comics_Author_ID)
        if comic is None:
            return jsonify({'error': 'Comic not found'}), 404

        db.session.delete(comic)
        db.session.commit()
        
        return jsonify({'message': 'Comic deleted successfully'}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500