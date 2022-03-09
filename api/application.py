"""The file is for the main flask application"""

import os

from datetime import timedelta
from flask import Flask
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv, find_dotenv

from user_auth import auth_bp
from portfolio import portfolio_bp
from social import social_bp
from recomend import recomend_BP
from twitter import twitter_bp

load_dotenv(find_dotenv())

application = Flask(__name__)

application.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
application.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(application)

application.register_blueprint(auth_bp, url_prefix="/auth")
application.register_blueprint(portfolio_bp, url_prefix="/portfolio")
application.register_blueprint(social_bp, url_prefix="/social")
application.register_blueprint(recomend_BP, url_prefix="/recomend")
application.register_blueprint(twitter_bp, url_prefix="/twitter")



#default endpoint for backend
#to check server health
@application.route("/")
def hello_world():
  return "<p>Hello world! Backend is \
    up and running </p>", 200


if __name__ == "__main__":
  application.run()
