import os

from flask import Flask
from user_auth import auth_bp
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())   
app = Flask(__name__)

app.register_blueprint(auth_bp,url_prefix='/auth')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

if __name__ == '__main__':
    app.run()
