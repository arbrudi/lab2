from flask import Flask
from pymongo import MongoClient
from extensions import db
from Views.Register import views_bp
from Views.Login import auth_bp
from Views.Books import books_bp
from Views.Events import events_bp
from Views.Event_Participant import eventp_bp
from Views.Comics import Comics_bp
from Views.Comics_Author import ComicsA_bp
from Views.Book_Genre import bookG_bp
from Views.Book_Status import bookS_bp
from Views.User import Users_bp 
from flask_pymongo import PyMongo 
from dotenv import load_dotenv 
import os

load_dotenv(dotenv_path='./config/.env')
from Views.User import Users_bp
from Views.ListOfFeatures import features_bp
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='./config/.env')
from Views.ML_model import recommendation_bp
from Views.Comic_rating import cRating_bp
from Views.Book_ratings import bRating_bp
from Views.Favorite_Books import favbook_bp

def create_app():
    app = Flask(__name__)

    # Load environment variables
    load_dotenv(dotenv_path='./config/.env')

    # Configure MSSQL
    conn = 'mssql+pyodbc:///?odbc_connect=' + \
           'DRIVER={ODBC Driver 17 for SQL Server};' + \
           'SERVER=LAPTOP-TQGV5751;' + \
           'DATABASE=lab2;' + \
           'Trusted_Connection=yes;'
    app.config['SQLALCHEMY_DATABASE_URI'] = conn
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Configure MongoDB
    mongo_uri = os.getenv("DB_URI")
    mongo_client = MongoClient(mongo_uri)
    app.config['MONGO_CLIENT'] = mongo_client  # Attach mongo client to the app config
    app.config['SQLALCHEMY_DATABASE_URI'] = conn 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Configure MongoDB
    app.config["MONGO_URI"] = os.getenv("DB_URI")
    mongo = PyMongo(app)

    # Initialize SQLAlchemy instance
    db.init_app(app)

    app.register_blueprint(cRating_bp)
    app.register_blueprint(Users_bp)
    app.register_blueprint(views_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(books_bp)
    app.register_blueprint(bookG_bp)
    app.register_blueprint(events_bp)
    app.register_blueprint(eventp_bp)
    app.register_blueprint(Comics_bp)
    app.register_blueprint(ComicsA_bp)
    app.register_blueprint(bookS_bp)
    app.register_blueprint(features_bp)
    
    app.register_blueprint(recommendation_bp, url_prefix='/recommendations')
    app.register_blueprint(bRating_bp)
    app.register_blueprint(favbook_bp)

    with app.app_context():
        # Test MSSQL connection
        try:
            db.engine.connect()
            print("Connection to MSSQL database successful!")
        except Exception as e:
            print("Error connecting to MSSQL database:", e)
        
        # Test MongoDB connection
        try:
            mongo_client.server_info()  # Ping the MongoDB server
            mongo.cx.server_info()  # Ping the MongoDB server
            print("Connection to MongoDB successful!")
        except Exception as e:
            print("Error connecting to MongoDB:", e)

    return app

if __name__ == "__main__":
    app = create_app()
    port = os.getenv("PORT", 5000)
    app.run(debug=True, port=port)