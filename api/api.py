import os

from flask import Flask
from flask_jwt_extended import JWTManager

from user_auth import auth_bp
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) 

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
jwt = JWTManager(app)

app.register_blueprint(auth_bp,url_prefix='/auth')


if __name__ == '__main__':
    app.run()
