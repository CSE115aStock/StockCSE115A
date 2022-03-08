"""The module contains all the endpoints for viewing/modifying
 the user's portfolio"""

import psycopg2
import os
import json

from dotenv import load_dotenv, find_dotenv
from psycopg2.extensions import AsIs

from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
  get_jwt_identity, jwt_required,
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

portfolio_bp = Blueprint("portfolio", __name__, url_prefix="/portfolio")


# Add new stock to user portfolio
# Returns user portfolio when new token is added successfully.
# INPUT: {"tickr":{"amount": "amount_spent", "shares": "num_shares"}}
# RETURN: updated user portfolio
@portfolio_bp.route("/add_stock", methods=["POST"])
@jwt_required()
def add_stock():
  verify_jwt_in_request(optional=False)
  cur = conn.cursor()

  # stock entry format: {"tickr":{"amount": "1350", "shares": "100"}}
  data = json.loads(request.data)
  tickr = data["tickr"]
  amount = data["amount"]
  shares = data["shares"]
  usr_email = get_jwt_identity()

  stock = {tickr: {"amount": amount, "shares": shares}}

  # check if user token exists.
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute(
    "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
    (json.dumps(stock), usr_email),
  )
  conn.commit()

  cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
  port = cur.fetchone()
  port_dict = port[0]

  return jsonify(port_dict), 200


# Remove a stock from user portfolio
# INPUT: tickr symbol
# RETURN: updated user portfolio
@portfolio_bp.route("/remove_stock", methods=["GET", "POST"])
@jwt_required()
def remove_stock():
  verify_jwt_in_request(optional=False)
  cur = conn.cursor()

  if request.method == "POST":
    data = json.loads(request.data)
    stock_tickr = data["tickr"]

    usr_email = get_jwt_identity()
    if not usr_email:
      return jsonify({"err_msg": "Couldn't verify user."}), 403

    # fetch portfolio
    cur = conn.cursor()
    cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
    port = cur.fetchone()
    port_dict = port[0]

    # fetch stock
    if stock_tickr not in port_dict:
      return jsonify({"err_msg": "Stock could not be found"}), 404

    del port_dict[stock_tickr]

    cur.execute(
      "UPDATE users SET portfolio = '{}' WHERE email=%s", (usr_email,)
    )
    cur.execute(
      "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
      (json.dumps(port_dict), usr_email),
    )
    conn.commit()

  cur = conn.cursor()
  cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
  port = cur.fetchone()
  port_dict = port[0]

  return jsonify(port_dict), 200


# Buy more of a stock already in the portfolio
# INPUT: ticker, amount of new shares, and amount spent
# on those shares
# RETURN: updated user portfolio
@portfolio_bp.route("/buy", methods=["GET", "POST"])
@jwt_required()
def buy_stock():
  verify_jwt_in_request(optional=False)

  # fetch portfolio
  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur = conn.cursor()

  cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
  port = cur.fetchone()
  port_dict = port[0]

  if request.method == "POST":
    # fetch the stock to change, the new shares, and amount
    data = json.loads(request.data)
    tickr = data["tickr"]
    add_amount = data["amount"]
    add_shares = data["shares"]

    if int(add_shares) < 0 or int(add_amount) < 0:
      return (
        jsonify(
          {"err_msg": "New shares and amount cannot be negative."}
        ),
        400
      )

    # check if stock in portfolio
    if tickr not in port_dict:
      return jsonify({"err_msg": "Stock could not be found"}), 404

    # calculate new amount and update db
    new_amount = int(port_dict[tickr]["amount"]) + int(add_amount)
    new_shares = int(port_dict[tickr]["shares"]) + int(add_shares)
    new_shares_str = str(new_shares)
    new_amount_str = str(new_amount)
    cur.execute(
      "UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb),"
      " '{%s,amount}', %s, true) WHERE email =%s",
      (AsIs(tickr), new_amount_str, usr_email),
    )
    cur.execute(
      "UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb),"
      " '{%s,shares}', %s, true) WHERE email =%s",
      (AsIs(tickr), new_shares_str, usr_email),
    )
    conn.commit()

  # return updated portfolio
  cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
  port = cur.fetchone()
  port_dict = port[0]

  return jsonify(port_dict), 200


# Sell shares and amount of a stock.
# If shares sold = shares held, stock is removed from
# portfolio
# INPUT: ticker, amount of sold shares, and amount earned
# selling those shares
# RETURN: updated user portfolio
@portfolio_bp.route("/sell", methods=["GET", "POST"])
@jwt_required()
def sell_stock():
  verify_jwt_in_request(optional=False)
  # fetch portfolio
  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur = conn.cursor()
  cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
  port = cur.fetchone()
  port_dict = port[0]

  if request.method == "POST":
    # fetch the stock to change, the new shares, and amount
    data = json.loads(request.data)
    tickr = data["tickr"]
    sell_amount = data["amount"]
    sell_shares = data["shares"]

  if int(sell_shares) < 0 or int(sell_amount) < 0:
    return (
      jsonify(
        {
          "err_msg": "Shares and amount to remove cannot be negative"
        }
      ),
      400
    )

  # check if stock in portfolio
  if tickr not in port_dict:
    return jsonify({"err_msg": "Stock could not be found"}), 404

  # calculate new amount and update db
  sell_price_per_share = int(sell_amount) / int(sell_shares)
  new_amount = int(port_dict[tickr]["shares"]) * sell_price_per_share - int(
    sell_amount
    )
  new_shares = int(port_dict[tickr]["shares"]) - int(sell_shares)

  if new_shares < 0:
    return (
      jsonify({"err_msg": "Cannot sell more shares than you have."}),
      401,
    )
  elif new_shares == 0:
    del port_dict[tickr]
    cur.execute(
      "UPDATE users SET portfolio = '{}' WHERE email=%s", (usr_email,)
    )
    cur.execute(
      "UPDATE users SET portfolio = portfolio || %s WHERE email=%s",
      (json.dumps(port_dict), usr_email),
    )
    conn.commit()
  else:
    new_shares_str = str(new_shares)
    new_amount_str = str(new_amount)
    cur.execute(
      "UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb),"
      " '{%s,amount}', %s, true) WHERE email =%s",
      (AsIs(tickr), new_amount_str, usr_email),
    )
    cur.execute(
      "UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb),"
      " '{%s,shares}', %s, true) WHERE email =%s",
      (AsIs(tickr), new_shares_str, usr_email),
    )
    conn.commit()

  # return updated portfolio
  cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
  port = cur.fetchone()
  port_dict = port[0]
  return jsonify(port_dict), 200


# Fetch user portfolio
# RETURN: user portfolio
@portfolio_bp.route("/my_portfolio", methods=["GET", "POST"])
@jwt_required()
def fetch_portfolio():
  verify_jwt_in_request(optional=False)
  cur = conn.cursor()

  usr_email = get_jwt_identity()
  if not usr_email:
    return jsonify({"err_msg": "Couldn't verify user."}), 403

  cur.execute("SELECT portfolio FROM users WHERE email=%s", (usr_email,))
  usr_portfolio = cur.fetchone()
  return jsonify(usr_portfolio), 200
