"""The module contains all the tests for the portfolio api"""

import psycopg2
import os
import json

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
def test_add_stock(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/add_stock",
        headers=headers,
        json={"tickr": "EX", "amount": "200", "shares": "2"},
      )
      assert json_response.status == "200 OK"

      if json_response.status == "200 OK":
        cur.execute("SELECT portfolio FROM users WHERE email='john@mail.com'")
        conn.commit()
        port = cur.fetchone()
        port_dict = port[0]

        del port_dict["EX"]

        cur.execute(
        "UPDATE users SET portfolio = '{}' WHERE email='john@mail.com'")
        cur.execute(
        "UPDATE users SET portfolio = portfolio"
        "|| %s WHERE email=%s"
        ,(json.dumps(port_dict), "john@mail.com"),)
        conn.commit()

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_remove_stock(mock_jwt):
  stock = {"EX": {"amount": 200, "shares": 1}}
  cur.execute(
    "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
    (json.dumps(stock), "john@mail.com"),
  )
  conn.commit()

  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/remove_stock",
        headers=headers,
        json={"tickr": "EX"},
      )
      assert json_response.status == "200 OK"

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_remove_nonexistent_stock(mock_jwt):

  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/remove_stock",
        headers=headers,
        json={"tickr": "EX"},
      )
      assert json_response.status == "404 NOT FOUND"

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_buy_stock(mock_jwt):
  stock = {"EX": {"amount": 200, "shares": 1}}
  cur.execute(
    "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
    (json.dumps(stock), "john@mail.com"),
  )
  conn.commit()
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/buy",
        headers=headers,
        json={"tickr": "EX", "amount": "200", "shares": "2"},
      )
      assert json_response.status == "200 OK"

      cur.execute("SELECT portfolio FROM users WHERE email='john@mail.com'")
      conn.commit()
      port = cur.fetchone()
      port_dict = port[0]

      del port_dict["EX"]

      cur.execute(
        "UPDATE users SET portfolio = '{}' WHERE email='john@mail.com'")
      cur.execute(
        "UPDATE users SET portfolio = portfolio"
        "|| %s WHERE email=%s"
        ,(json.dumps(port_dict), "john@mail.com"),)
      conn.commit()

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_buy_negative_stock(mock_jwt):
  stock = {"EX": {"amount": 200, "shares": 1}}
  cur.execute(
    "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
    (json.dumps(stock), "john@mail.com"),
  )
  conn.commit()
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/buy",
        headers=headers,
        json={"tickr": "EX", "amount": "-200", "shares": "2"},
      )
      assert json_response.status == "400 BAD REQUEST"

      cur.execute("SELECT portfolio FROM users WHERE email='john@mail.com'")
      conn.commit()
      port = cur.fetchone()
      port_dict = port[0]

      del port_dict["EX"]

      cur.execute(
        "UPDATE users SET portfolio = '{}' WHERE email='john@mail.com'")
      cur.execute(
        "UPDATE users SET portfolio = portfolio"
        "|| %s WHERE email=%s"
        ,(json.dumps(port_dict), "john@mail.com"),)
      conn.commit()

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_sell_stock(mock_jwt):
  stock = {"EX": {"amount": 200, "shares": 1}}
  cur.execute(
    "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
    (json.dumps(stock), "john@mail.com"),
  )
  conn.commit()
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/sell",
        headers=headers,
        json={"tickr": "EX", "amount": "200", "shares": "1"},
      )
      assert json_response.status == "200 OK"

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_sell_negative_stock(mock_jwt):
  stock = {"EX": {"amount": 200, "shares": 1}}
  cur.execute(
    "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
    (json.dumps(stock), "john@mail.com"),
  )
  conn.commit()
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/sell",
        headers=headers,
        json={"tickr": "EX", "amount": "-200", "shares": "1"},
      )
      assert json_response.status == "400 BAD REQUEST"

      cur.execute("SELECT portfolio FROM users WHERE email='john@mail.com'")
      conn.commit()
      port = cur.fetchone()
      port_dict = port[0]

      del port_dict["EX"]

      cur.execute(
        "UPDATE users SET portfolio = '{}' WHERE email='john@mail.com'")
      cur.execute(
        "UPDATE users SET portfolio = portfolio"
        "|| %s WHERE email=%s"
        ,(json.dumps(port_dict), "john@mail.com"),)
      conn.commit()

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_sell_more_than_owned_stock(mock_jwt):
  stock = {"EX": {"amount": 200, "shares": 1}}
  cur.execute(
    "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
    (json.dumps(stock), "john@mail.com"),
  )
  conn.commit()
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.post(
        "/portfolio/sell",
        headers=headers,
        json={"tickr": "EX", "amount": "200", "shares": "2"},
      )
      assert json_response.status == "401 UNAUTHORIZED"

      cur.execute("SELECT portfolio FROM users WHERE email='john@mail.com'")
      conn.commit()
      port = cur.fetchone()
      port_dict = port[0]

      del port_dict["EX"]

      cur.execute(
        "UPDATE users SET portfolio = '{}' WHERE email='john@mail.com'")
      cur.execute(
        "UPDATE users SET portfolio = portfolio"
        "|| %s WHERE email=%s"
        ,(json.dumps(port_dict), "john@mail.com"),)
      conn.commit()


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_fetch_portfolio(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      access_token = create_access_token("john@mail.com")
      headers = {"Authorization": "Bearer {}".format(access_token)}
      json_response = c.get(
        "/portfolio/my_portfolio",
        headers=headers,
      )
      assert json_response.status == "200 OK"

@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_fetch_nonexistent_portfolio(mock_jwt):
  with application.test_client() as c:
    with application.app_context():
      headers = {"Authorization": ""}
      json_response = c.get(
        "/portfolio/my_portfolio",
        headers=headers,
      )
      assert json_response.status == "401 UNAUTHORIZED"
