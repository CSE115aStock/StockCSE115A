import os

from datetime import timedelta
from flask import Flask
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv, find_dotenv

from user_auth import auth_bp
from portfolio import portfolio_bp
from social import social_bp

load_dotenv(find_dotenv())

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(portfolio_bp, url_prefix="/portfolio")
app.register_blueprint(social_bp, url_prefix="/social")

if __name__ == "__main__":
    app.run()
