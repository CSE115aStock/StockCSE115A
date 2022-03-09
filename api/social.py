"""The module contains all the endpoints for the social aspect
of the platform"""

import psycopg2
import os
import json

from dotenv import load_dotenv, find_dotenv
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
  get_jwt_identity,
  jwt_required,
  verify_jwt_in_request,
)

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

social_bp = Blueprint("social", __name__, url_prefix="/social")


DATE_LENGTH = 18

# Like a particular stock for a user
# INPUT: valid tickr
# RETURN: returns success message if like added without issues
@social_bp.route("/add_like", methods=["POST"])
@jwt_required()
def add_like():
  cur = conn.cursor()

  data = json.loads(request.data)
  tickr = data["tickr"]
  curr_time = str(datetime.now(timezone.utc))
  time_stmp = curr_time[:DATE_LENGTH]

  verify_jwt_in_request(optional=False)
  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  try:
    cur.execute(
      "INSERT INTO likes VALUES(%s,%s,%s)", (tickr, usrname, time_stmp)
    )
  except psycopg2.DatabaseError as err:
    cur.execute("ROLLBACK")
    conn.commit()
    return jsonify({"err_msg": err}), 400

  conn.commit()

  return jsonify({"msg": "like added"}), 200


# Remove like for particular stock for the user
# INPUT: valid tickr
# RETURN: returns success message if like removed without issues
@social_bp.route("/remove_like", methods=["DELETE"])
@jwt_required()
def remove_like():
  cur = conn.cursor()

  data = json.loads(request.data)
  tickr = data["tickr"]
  verify_jwt_in_request(optional=False)

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  cur.execute(
    "DELETE FROM likes WHERE username=%s AND tickr=%s", (usrname, tickr)
  )

  conn.commit()

  return jsonify({"msg": "like removed"}), 200


# Gives all the stocks user has liked
# RETURN: list of stocks the user has liked on success
@social_bp.route("/user_likes", methods=["GET"])
@jwt_required()
def user_likes():
  cur = conn.cursor()

  verify_jwt_in_request(optional=False)
  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  cur.execute("SELECT tickr FROM likes WHERE username=%s", (usrname,))
  likes = cur.fetchall()

  return jsonify(likes)

# gives whether has liked a particular stock
# INPUT: valid tickr
# RETURN: number of likes from toward particular stockn(should be 1 or 0)
@social_bp.route("/liked", methods=["PUT"])
@jwt_required()
def check_likes():
  cur = conn.cursor()
  verify_jwt_in_request(optional=False)
  data = json.loads(request.data)
  tickr = data["tickr"]
  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403
  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  cur.execute(
    "SELECT COUNT(*) FROM likes WHERE tickr=%s AND username=%s",
    (
      tickr,
      usrname,
    ),
  )
  num_likes = cur.fetchone()

  return jsonify(num_likes[0]), 200


# gives total likes for a particular stock
# INPUT: valid tickr
# RETURN: number of likes toward particular stock
@social_bp.route("/total_likes", methods=["PUT"])
@jwt_required()
def total_likes():
  cur = conn.cursor()

  verify_jwt_in_request(optional=False)
  data = json.loads(request.data)
  tickr = data["tickr"]

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT COUNT(*) FROM likes WHERE tickr=%s", (tickr,))
  num_likes = cur.fetchone()

  return jsonify(num_likes[0])


# gives all the people who like a particular stock
# INPUT: valid tickr
# RETURN: list of users who have liked the stock
@social_bp.route("/all_likes", methods=["PUT"])
@jwt_required()
def all_likes():
  cur = conn.cursor()
  verify_jwt_in_request(optional=False)

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  data = json.loads(request.data)
  tickr = data["tickr"]

  cur.execute("SELECT username FROM likes WHERE tickr=%s", (tickr,))
  likers = cur.fetchall()

  return jsonify(likers)


# Adds a comment on a particular stock
# INPUT: valid tickr, comment under 280 characters
# RETURN: returns success message if comment added without issues
@social_bp.route("/add_comment", methods=["POST"])
@jwt_required()
def add_comment():
  cur = conn.cursor()

  data = json.loads(request.data)
  tickr = data["tickr"]
  comment = data["comment"]
  verify_jwt_in_request(optional=False)

  if len(comment) == 0:
    return jsonify({"err_msg": "Comment cannot be blank"}), 400

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  curr_time = str(datetime.now(timezone.utc))
  time_stmp = curr_time[:DATE_LENGTH]

  try:
    cur.execute(
      "INSERT INTO comments VALUES(%s,%s,%s,%s)",
      (usrname, time_stmp, tickr, comment),
    )
  except psycopg2.DatabaseError:
    cur.execute("ROLLBACK")
    conn.commit()
    return jsonify({"err_msg": "Bad request"}), 400

  conn.commit()

  return jsonify({"msg": "comment added"}), 200


# Edits an existing comment on a particular stock
# INPUT: timestmp for when comment was created, edited comment
# under 280 characters
# RETURN: returns success message if comment edited without issues
@social_bp.route("/edit_comment", methods=["PUT"])
@jwt_required()
def edit_comment():
  cur = conn.cursor()

  data = json.loads(request.data)
  time_stmp = data["time_stmp"]
  comment = data["comment"]
  verify_jwt_in_request(optional=False)

  if len(comment) == 0:
    return jsonify({"err_msg": "Comment cannot be blank"}), 400

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  curr_time = str(datetime.now(timezone.utc))
  new_time_stmp = curr_time[0:18]

  try:
    cur.execute(
      "UPDATE comments SET comment_body=%s, created_on=%s \
      WHERE created_on=%s AND username=%s",
      (comment, new_time_stmp, time_stmp, usrname),
    )
  except psycopg2.DatabaseError as err:
    cur.execute("ROLLBACK")
    conn.commit()
    return jsonify({"err_msg": err}), 400

  conn.commit()

  return jsonify({"msg": "comment edited"}), 200


# Removes a comment on a particular stock
# INPUT: timestamp for when comment was created
# RETURN: returns success message if comment removed without issues
@social_bp.route("/remove_comment", methods=["DELETE"])
@jwt_required()
def remove_comment():
  cur = conn.cursor()

  data = json.loads(request.data)
  time_stmp = data["time_stmp"]
  verify_jwt_in_request(optional=False)

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  try:
    cur.execute(
      "DELETE FROM comments WHERE username=%s and created_on=%s",
      (usrname, time_stmp),
    )
  except psycopg2.DatabaseError:
    cur.execute("ROLLBACK")
    conn.commit()
    return jsonify({"err_msg": "Bad request"}), 400

  conn.commit()

  return jsonify({"msg": "comment removed"}), 200


# gives total comments for a particular stock
# INPUT: valid tickr
# RETURN: number of comments on particular stock
@social_bp.route("/total_comments", methods=["PUT"])
@jwt_required()
def total_comments():
  cur = conn.cursor()

  data = json.loads(request.data)
  tickr = data["tickr"]

  verify_jwt_in_request(optional=False)

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT COUNT(*) FROM comments WHERE tickr=%s", (tickr,))
  num_comments = cur.fetchone()

  return jsonify(num_comments[0])


# gives all comments for a particular stock made by user
# INPUT: valid tickr
# RETURN: list of comments on success
@social_bp.route("/user_comments", methods=["PUT"])
@jwt_required()
def user_comments():
  cur = conn.cursor()
  verify_jwt_in_request(optional=False)

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  data = json.loads(request.data)
  tickr = data["tickr"]

  cur.execute("SELECT username from users WHERE email=%s", (usr_email,))
  usrname = cur.fetchone()

  cur.execute(
    "SELECT * FROM comments WHERE username=%s and tickr=%s",
    (usrname, tickr),
  )
  comments = cur.fetchall()

  return jsonify(comments)


# gives the 5 most recent comments
# INPUT: valid tickr
# RETURN: list of comments on success
@social_bp.route("/fetch_latest_comments", methods=["PUT"])
@jwt_required()
def fetch_latest_comments():
  cur = conn.cursor()
  verify_jwt_in_request(optional=False)

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  data = json.loads(request.data)
  tickr = data["tickr"]

  cur.execute(
    "SELECT * FROM comments WHERE tickr=%s order by created_on desc \
    fetch first 5 rows only",
    (tickr,),
  )
  comments = cur.fetchall()

  return jsonify(comments)


# gives all comments for a particular stock
# INPUT: valid tickr
# RETURN: list of all comments for the stock
@social_bp.route("/all_comments", methods=["PUT"])
@jwt_required()
def all_comments():
  cur = conn.cursor()
  verify_jwt_in_request(optional=False)
  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  data = json.loads(request.data)
  tickr = data["tickr"]
  cur.execute("SELECT * FROM comments WHERE tickr=%s order by created_on desc",
  (tickr,))
  comments = cur.fetchall()

  return jsonify(comments)
