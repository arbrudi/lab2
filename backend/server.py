from flask import Flask
from Models.Users import db 
from Views.Register import views_bp
from flask_login import LoginManager



def create_app():
    app = Flask(__name__)

    # Change SERVER
    conn = 'mssql+pyodbc:///?odbc_connect=' + \
           'DRIVER={ODBC Driver 17 for SQL Server};' + \
           'SERVER=LAPTOP-TQGV5751;' + \
           'DATABASE=lab2;' + \
           'Trusted_Connection=yes;'

    app.config['SQLALCHEMY_DATABASE_URI'] = conn 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.init_app(app)
    app.register_blueprint(views_bp)

    from Views.Login import auth_bp
    app.register_blueprint(auth_bp)

    with app.app_context():
        try:
            db.engine.connect()
            print("Connection to MSSQL database successful!")
        except Exception as e:
            print("Error connecting to MSSQL database:", e)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
