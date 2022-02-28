"""The module contains all the tests for the socialization api"""

import psycopg2
import os

from dotenv import load_dotenv, find_dotenv
from unittest.mock import patch

from application import application

from flask_jwt_extended import create_access_token

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
def test_add_like(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/social/add_like",
        headers=headers,
        json={"tickr": "EX"},
      )
      assert json_response.status == "200 OK"

      cur.execute(
        "DELETE FROM likes WHERE username='john.doe' and tickr='EX'"
      )
      conn.commit()


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_add_like_like_twice(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/social/add_like",
        headers=headers,
        json={"tickr": "E"}
      )
      assert json_response.status == "200 OK"

      json_response = c.post(
        "/social/add_like",
        headers=headers,
        json={"tickr": "E"},
      )
      assert json_response.status == "500 INTERNAL SERVER ERROR"

      cur.execute(
        "DELETE FROM likes WHERE username=%s and tickr=%s",
        ("john.doe", "E"),
      )
      conn.commit()


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_remove_like(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/social/add_like",
        headers=headers,
        json={"tickr": "ABC"},
      )
      assert json_response.status == "200 OK"

      json_response = c.delete(
        "/social/remove_like",
        headers=headers,
        json={"tickr": "ABC"},
      )
      assert json_response.status == "200 OK"

      cur.execute(
        "DELETE FROM likes WHERE username=%s and tickr=%s",
        ("john.doe", "ABC"),
      )
      conn.commit()


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_liked(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.put(
        "/social/liked", headers=headers, json={"tickr": "EXMPL"}
      )
      assert json_response.status == "200 OK"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_user_likes(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.get("/social/user_likes", headers=headers)
      assert json_response.status == "200 OK"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_total_likes(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.put(
        "/social/total_likes", headers=headers, json={"tickr": "EXMPL"}
      )

      assert json_response.status == "200 OK"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_all_likes(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.put(
        "/social/all_likes", headers=headers, json={"tickr": "EXMPL"}
      )

      assert json_response.status == "200 OK"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_add_comment(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/social/add_comment",
        headers=headers,
        json={"tickr": "EX", "comment": "test comment"},
      )
      assert json_response.status == "200 OK"

      cur.execute("DELETE FROM comments WHERE tickr='EX'")
      conn.commit()


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_user_comments(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.put(
        "/social/user_comments",
        headers=headers,
        json={"tickr": "EXMPL"},
      )
      assert json_response.status == "200 OK"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_fetch_latest_comments(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.put(
        "/social/fetch_latest_comments",
        headers=headers,
        json={"tickr": "EXMPL"},
      )
      assert json_response.status == "200 OK"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_all_comments(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.put(
        "/social/all_comments",
        headers=headers,
        json={"tickr": "EXMPL"},
      )
      assert json_response.status == "200 OK"
