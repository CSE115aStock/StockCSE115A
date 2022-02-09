from curses import use_default_colors
from xxlimited import new
import psycopg2
import argparse
import os
import sys
import re
import json

from dotenv import load_dotenv, find_dotenv
from pathlib import Path

from psycopg2.extras import RealDictCursor
from psycopg2.extensions import AsIs

from flask import (
    Flask,
    Blueprint,
    flash,
    redirect,
    url_for,
    render_template,
    jsonify,
    current_app,
    request,
)
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required

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


@social_bp.route("/add_like", methods=["POST"])
@jwt_required()
def addLike():
    cur = conn.cursor()

    if request.method == "POST":
        data = json.loads(request.data)
        tickr = data["tickr"]

        usr_email = get_jwt_identity()
        if not usr_email:
            return jsonify({"err_msg": "Couldn't verify user."}), 403
        
        cur.execute("SELECT username from users WHERE email=%s",(usr_email,))
        usrname = cur.fetchone()

        try:
            cur.execute("INSERT INTO likes VALUES(%s,%s)",(tickr,usrname))
        except Exception as err:
            return jsonify({"err_msg": "Cannot like stock twice"}), 400

        conn.commit()

        return jsonify({"msg":"like added"}), 200


@social_bp.route("/remove_like", methods=["DELETE"])
@jwt_required()
def removeLike():
    cur = conn.cursor()

    data = json.loads(request.data)
    tickr = data["tickr"]

    usr_email = get_jwt_identity()
    if not usr_email:
        return jsonify({"err_msg": "Couldn't verify user."}), 403
    
    cur.execute("SELECT username from users WHERE email=%s",(usr_email,))
    usrname = cur.fetchone()

    cur.execute("DELETE FROM likes where username=%s and tickr=%s", (tickr,usrname))

    conn.commit()

    return jsonify({"msg":"like removed"}), 200


@social_bp.route("/user_like", methods=["GET"])
@jwt_required()
def userLikes():
    cur = conn.cursor()

    usr_email = get_jwt_identity()
    if not usr_email:
        return jsonify({"err_msg": "Couldn't verify user."}), 403
    
    cur.execute("SELECT username from users WHERE email=%s",(usr_email,))
    usrname = cur.fetchone()

    cur.execute("SELECT tickr FROM likes WHERE username=%s",(usrname,))
    likes = cur.fetchall()

    return jsonify(likes)


@social_bp.route("/total_like", methods=["GET"])
@jwt_required()
def totalLikes():
    cur = conn.cursor()

    data = json.loads(request.data)
    tickr = data["tickr"]

    usr_email = get_jwt_identity()
    if not usr_email:
        return jsonify({"err_msg": "Couldn't verify user."}), 403
    
    cur.execute("SELECT COUNT(*) FROM likes WHERE tickr=%s",(tickr,))
    total_likes = cur.fetchone()

    return jsonify(total_likes[0])


if __name__ == "__main__":
    #likeStock()
    pass

