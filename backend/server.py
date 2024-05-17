from flask import Flask
from extensions import db
from Views.Register import views_bp
from Views.Login import auth_bp
from Views.Books import books_bp 
from Views.Events import events_bp
from Views.Event_Participant import eventp_bp
from Views.Comics import Comics_bp
from Views.Comics_Author import ComicsA_bp
from Views.Book_Genre import bookG_bp


def create_app():
    app = Flask(__name__)

    # Change SERVER
    conn = 'mssql+pyodbc:///?odbc_connect=' + \
           'DRIVER={ODBC Driver 17 for SQL Server};' + \
           'SERVER=DESKTOP-UD05JRG\MSSQLSERVER01;' + \
           'DATABASE=lab2;' + \
           'Trusted_Connection=yes;'

    app.config['SQLALCHEMY_DATABASE_URI'] = conn 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.init_app(app)
    
    app.register_blueprint(views_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(books_bp)
    app.register_blueprint(bookG_bp) 
    app.register_blueprint(events_bp)
    app.register_blueprint(eventp_bp) 
    app.register_blueprint(Comics_bp)
    app.register_blueprint(ComicsA_bp)


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
