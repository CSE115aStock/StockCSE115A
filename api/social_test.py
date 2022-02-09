import psycopg2
import os
from pathlib import Path

from dotenv import load_dotenv, find_dotenv
from unittest.mock import patch

from api import app

from flask_jwt_extended import create_access_token
from datetime import datetime, timezone

# load db connection config
load_dotenv(find_dotenv())

HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
DB_NAME = os.getenv("DB_NAME")
USR = os.getenv("USR")
PASSWORD = os.getenv("PASSWORD")


# connect to user DB
conn = psycopg2.connect(
    dbname=DB_NAME, user=USR, password=PASSWORD, host=HOST, port=PORT
)

cur = conn.cursor()


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_addLike(mock_jwt):
    with app.test_client() as c:
        with app.app_context():
            access_token = create_access_token("john@mail.com")
            headers = {"Authorization": "Bearer {}".format(access_token)}
            json_response = c.post(
                "/social/add_like",
                headers=headers,
                json={"tickr": "EXM"},
            )
            assert json_response.status == "200 OK"

            cur.execute("DELETE FROM likes WHERE username='john.doe' and tickr='EXM'")
            conn.commit()


# @patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
# def test_addLike_like_twice(mock_jwt):
#     with app.test_client() as c:
#         with app.app_context():
#             access_token = create_access_token("john@mail.com")
#             headers = {"Authorization": "Bearer {}".format(access_token)}
#             json_response = c.post(
#                 "/social/add_like",
#                 headers=headers,
#                 json={
#                     "tickr" : "EXM"
#                 },
#             )
#             assert json_response.status == "200 OK"

#             json_response = c.post(
#                 "/social/add_like",
#                 headers=headers,
#                 json={
#                     "tickr" : "EXM"
#                 },
#             )
#             assert json_response.status == "400 BAD REQUEST"

#             cur.execute("DELETE FROM likes WHERE username=%s and tickr=%s",("john.doe","EXM"))
#             conn.commit()


# @patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
# def test_userLikes(mock_jwt):
#     with app.test_client() as c:
#         with app.app_context():
#             access_token = create_access_token("john@mail.com")
#             headers = {"Authorization": "Bearer {}".format(access_token)}
#             json_response = c.get(
#                 "/social/user_likes",
#                 headers=headers
#             )
#             assert json_response.status == "200 OK"


# @patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
# def test_totalLikes(mock_jwt):
#     with app.test_client() as c:
#         with app.app_context():
#             access_token = create_access_token("john@mail.com")
#             headers = {"Authorization": "Bearer {}".format(access_token)}
#             json_response = c.get(
#                 "/social/total_likes",
#                 headers=headers
#             )
#             assert json_response.status == "200 OK"
