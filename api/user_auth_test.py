import psycopg2
import os

from dotenv import load_dotenv, find_dotenv
from unittest.mock import patch
from passlib.hash import bcrypt

from api import app

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


def test_AddUser():
    with app.test_client() as c:
        rv = c.post(
            "/auth/signup",
            json={
                "first_name": "test_first",
                "last_name": "test_last",
                "email": "t_user@example.com",
                "username": "test.user2",
                "password": "Test@1234",
                "verify_password": "Test@1234",
            },
        )
        json_response = rv.get_json()

        cur.execute("DELETE from users WHERE username='test.user2'")
        conn.commit()

        assert json_response["err_msg"] == "Account creation successful"


def test_AddUser_weak_password():
    with app.test_client() as c:
        rv = c.post(
            "/auth/signup",
            json={
                "first_name": "test_first",
                "last_name": "test_last",
                "email": "t1@example.com",
                "username": "test.user2",
                "password": "Test1234",
                "verify_password": "Test1234",
            },
        )
        json_response = rv.get_json()

        assert json_response["err_msg"] == "Password not strong enough."


def test_AddUser_password_mismatch():
    with app.test_client() as c:
        rv = c.post(
            "/auth/signup",
            json={
                "first_name": "test_first",
                "last_name": "test_last",
                "email": "t1@example.com",
                "username": "test.user2",
                "password": "Test@1234",
                "verify_password": "Test@123",
            },
        )
        json_response = rv.get_json()

        assert json_response["err_msg"] == "Passwords do not match"


def test_AddUser_invalid_email():
    with app.test_client() as c:
        rv = c.post(
            "/auth/signup",
            json={
                "first_name": "test_first",
                "last_name": "test_last",
                "email": "t1@exampl.om",
                "username": "test.user2",
                "password": "Test@1234",
                "verify_password": "Test@1234",
            },
        )
        json_response = rv.get_json()

        assert json_response["err_msg"] == "Invalid email."


def test_AddUser_missing_field():
    with app.test_client() as c:
        rv = c.post(
            "/auth/signup",
            json={
                "first_name": "test_first",
                "last_name": "test_last",
                "email": "",
                "username": "test.user2",
                "password": "Test@1234",
                "verify_password": "Test@1234",
            },
        )
        json_response = rv.get_json()

        assert json_response["err_msg"] == "Email is required."


def test_AddUser_already_registered():
    with app.test_client() as c:
        rv = c.post(
            "/auth/signup",
            json={
                "first_name": "test_first",
                "last_name": "test_last",
                "email": "test@example.com",
                "username": "test.user1",
                "password": "Test@1234",
                "verify_password": "Test@1234",
            },
        )
        json_response = rv.get_json()

        assert json_response["err_msg"] == "User is already registered."


def test_AuthenticateUser():
    with app.test_client() as c:
        rv = c.post(
            "/auth/login", json={"username": "test.user1", "password": "Test@1234"}
        )
        json_response = rv.get_json()
        assert "err_msg" not in json_response


def test_AuthenticateUser_bad_password():
    with app.test_client() as c:
        rv = c.post(
            "/auth/login", json={"username": "test.user1", "password": "Test1234"}
        )
        json_response = rv.get_json()
        assert json_response["err_msg"] == "Invalid password"


def test_AuthenticateUser_bad_username():
    with app.test_client() as c:
        rv = c.post(
            "/auth/login", json={"username": "test.use1", "password": "Test@1234"}
        )
        json_response = rv.get_json()
        assert json_response["err_msg"] == "Invalid username"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_logout(mock_jwt):
    with app.test_client() as c:
        with app.app_context():
            access_token = create_access_token("john@mail.com")
            headers = {"Authorization": "Bearer {}".format(access_token)}
            json_response = c.get("/auth/logout", headers=headers)
            assert json_response != None


# test changing password
@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_change_password(mock_jwt):
    with app.test_client() as c:
        with app.app_context():
            access_token = create_access_token("john@mail.com")
            headers = {"Authorization": "Bearer {}".format(access_token)}
            json_response = c.put(
                "/auth/settings/password",
                headers=headers,
                json={
                    "Current Password": "John@12345",
                    "New Password": "12345@John",
                    "Repeat": "12345@John",
                },
            )
            og_pwd = bcrypt.hash("John@12345")
            cur.execute(
                "UPDATE users SET pass=%s WHERE email='john@mail.com'",
                (og_pwd,),
            )
            conn.commit()
            assert json_response.status == "200 OK"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_change_password_incorrect_password(mock_jwt):
    with app.test_client() as c:
        with app.app_context():
            access_token = create_access_token("john@mail.com")
            headers = {"Authorization": "Bearer {}".format(access_token)}
            json_response = c.put(
                "/auth/settings/password",
                headers=headers,
                json={
                    "Current Password": "John12345",
                    "New Password": "12345@John",
                    "Repeat": "12345@John",
                },
            )
            assert json_response.status == "401 UNAUTHORIZED"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_change_password_mismatched(mock_jwt):
    with app.test_client() as c:
        with app.app_context():
            access_token = create_access_token("john@mail.com")
            headers = {"Authorization": "Bearer {}".format(access_token)}
            json_response = c.put(
                "/auth/settings/password",
                headers=headers,
                json={
                    "Current Password": "John@12345",
                    "New Password": "12345John",
                    "Repeat": "12345@John",
                },
            )
            assert json_response.status == "400 BAD REQUEST"


@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_change_password_weak(mock_jwt):
    with app.test_client() as c:
        with app.app_context():
            access_token = create_access_token("john@mail.com")
            headers = {"Authorization": "Bearer {}".format(access_token)}
            json_response = c.put(
                "/auth/settings/password",
                headers=headers,
                json={
                    "Current Password": "John@12345",
                    "New Password": "John",
                    "Repeat": "John",
                },
            )
            assert json_response.status == "400 BAD REQUEST"


# test changing account details
@patch("flask_jwt_extended.view_decorators.verify_jwt_in_request")
def test_change_account_detais(mock_jwt):
    with app.test_client() as c:
        with app.app_context():
            access_token = create_access_token("john@mail.com")
            headers = {"Authorization": "Bearer {}".format(access_token)}
            json_response = c.put(
                "/auth/settings/account",
                headers=headers,
                json={
                    "First Name": "Jane",
                    "Last Name": "doe",
                    "Username": "john.doe",
                },
            )
            og_name = "john"
            cur.execute(
                "UPDATE users SET first_name=%s WHERE email='john@mail.com'",
                (og_name,),
            )
            conn.commit()
            assert json_response.status == "200 OK"
