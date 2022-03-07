"""The module contains all the tests for the socialization api"""
import os
from dotenv import load_dotenv, find_dotenv
from unittest.mock import patch
from application import application

# load db connection config
load_dotenv(find_dotenv())

HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
DB_NAME = os.getenv("DB_NAME")
USR = os.getenv("USR")
PASSWORD = os.getenv("PASSWORD")



@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_tweet(mock_jwt):
  with application.test_client() as c:
    headers = {}
    json_response = c.post(
        "/twitter/get_tweet",
        headers=headers,
        json={"query": "tsla"},
      )
    with open("gurp.txt", "w",encoding="utf8") as text_file:
      text_file.write(str(json_response.data))
