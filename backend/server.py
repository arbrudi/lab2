from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Change SERVER
conn = 'mssql+pyodbc:///?odbc_connect=' + \
       'DRIVER={ODBC Driver 17 for SQL Server};' + \
       'SERVER=LAPTOP-TQGV5751;' + \
       'DATABASE=lab2;' + \
       'Trusted_Connection=yes;'

app.config['SQLALCHEMY_DATABASE_URI'] = conn 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


with app.app_context():
    try:
        db.engine.connect()
        print("Connection to MSSQL database successful!")
    except Exception as e:
        print("Error connecting to MSSQL database:", e)


if __name__ == "__main__":
    app.run(debug=True)