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

from flask import Flask, Blueprint, flash, redirect, url_for, render_template, jsonify, current_app, request
from flask_jwt_extended import get_jwt,get_jwt_identity, jwt_required

#load db connection config
load_dotenv(find_dotenv())   

HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
DB_NAME = os.getenv('DB_NAME')
USR = os.getenv('USR')
PASSWORD = os.getenv('PASSWORD')

#connect to user DB
conn = psycopg2.connect(dbname=DB_NAME,user=USR,password=PASSWORD,host=HOST,port=PORT)

portfolio_bp = Blueprint('portfolio', __name__, url_prefix='/portfolio')


#Add new stock to user portfolio
@portfolio_bp.route("/add_stock", methods=['GET','POST'])
@jwt_required
def addStock():
    cur = conn.cursor()
  
    if request.method == 'POST':
        #stock entry format: {"tickr":{"amount": "1350", "shares": "100"}}
        stock = request.json.get("stock", None)
        usr_email = get_jwt_identity()

        if not usr_email:
            return jsonify({"err_msg":"Couldn't verify user."}), 403

        cur.execute("UPDATE users SET portfolio = portfolio || %s WHERE email=%s",(stock,usr_email))
        conn.commit()

        cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,)) 
        port = cur.fetchone()  
        port_dict = port[0]
        
        return jsonify(port_dict)


#Remove a stocm from user portfolio
@portfolio_bp.route("/remove_stock", methods=['GET','POST'])
@jwt_required
def removeStock():
    cur = conn.cursor()
  
    if request.method == 'POST':
        #expect stock tickr only
        stock_tickr = request.json.get("stock_tickr", None)
        usr_email = get_jwt_identity()
        if not usr_email:
            return jsonify({"err_msg":"Couldn't verify user."}), 403

        #fetch portfolio
        cur = conn.cursor()
        cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,)) 
        port = cur.fetchone()  
        port_dict = port[0]

        #fetch stock
        if stock_tickr not in port_dict:
            return jsonify({"err_msg":"Stock could not be found"}), 404

        del port_dict[stock_tickr]

        cur.execute("UPDATE users SET portfolio = '{}' WHERE email=%s",(usr_email,))
        cur.execute("UPDATE users SET portfolio = portfolio || %s WHERE email=%s",(json.dumps(port_dict),usr_email))
        conn.commit()

        cur = conn.cursor()
        cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,)) 
        port = cur.fetchone()  
        port_dict = port[0]
        
        return jsonify(port_dict)


#Buy more of a stock already in the portfolio
@portfolio_bp.route("/buy",methods=['GET','POST'])
@jwt_required
def buyStock():

    #fetch portfolio
    usr_email = get_jwt_identity()
    if not usr_email:
        return jsonify({"err_msg":"Couldn't verify user."}), 403
    
    cur = conn.cursor()
    
    cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,)) 
    port = cur.fetchone()  
    port_dict = port[0]


    if request.method == 'POST':
        #fetch the stock to change, the new shares, and amount
        tickr = request.json.get("stock_ticker")
        add_amount = request.json.get("amount")
        add_shares = request.json.get("num_shares")

        if int(add_shares) < 0 or int(add_amount) < 0:
            return jsonify({"err_msg":"New shares and amount cannot be negative."}), 400

        #check if stock in portfolio
        if tickr not in port_dict:
            return jsonify({"err_msg":"Stock could not be found"}), 404
    
        #calculate new amount and update db
        new_amount = int(port_dict[tickr]['amount']) + int(add_amount)
        new_shares = int(port_dict[tickr]['shares']) + int(add_shares)
        new_shares_str = str(new_shares)
        new_amount_str = str(new_amount)
        cur.execute("UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb), '{%s,amount}', %s, true) WHERE email =%s",(AsIs(tickr),new_amount_str,usr_email))
        cur.execute("UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb), '{%s,shares}', %s, true) WHERE email =%s",(AsIs(tickr),new_shares_str,usr_email))
        conn.commit() 

        #return updated portfolio
        cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,)) 
        port = cur.fetchone()  
        port_dict = port[0]
        return jsonify(port_dict) 



#Sell shares and amount of a stock
@portfolio_bp.route("/sell",methods=['GET','POST'])
@jwt_required
def sellStock():

    #fetch portfolio
    usr_email = get_jwt_identity()
    if not usr_email:
        return jsonify({"err_msg":"Couldn't verify user."}), 403

    cur = conn.cursor()
    cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,)) 
    port = cur.fetchone()  
    port_dict = port[0]


    if request.method == 'POST':
        #fetch the stock to change, the new shares, and amount
        tickr = request.json.get("stock_ticker")
        sell_amount = request.json.get("amount")
        sell_shares = request.json.get("num_shares")

        if int(sell_shares) < 0 or int(sell_amount) < 0:
            return jsonify({"err_msg":"Shares and amount to remove cannot be negative"}), 400
        
        #check if stock in portfolio
        if tickr not in port_dict:
            return jsonify({"err_msg":"Stock could not be found"}), 404
    
        #calculate new amount and update db
        new_amount = int(port_dict[tickr]['amount']) - int(sell_amount)
        new_shares = int(port_dict[tickr]['shares']) - int(sell_shares)

        if new_shares < 0:
            return jsonify({"err_msg":"Cannot sell more shares than you have."}), 400
        elif new_shares == 0:
            del port_dict[tickr]
            cur.execute("UPDATE users SET portfolio = '[]' WHERE email=%s",(usr_email,))
            cur.execute("UPDATE users SET portfolio = portfolio || %s WHERE email=%s",(json.dumps(port_dict),usr_email))
            conn.commit()
        else:
            new_shares_str = str(new_shares)
            new_amount_str = str(new_amount)
            cur.execute("UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb), '{%s,amount}', %s, true) WHERE email =%s",(AsIs(tickr),new_amount_str,usr_email))
            cur.execute("UPDATE users SET portfolio = jsonb_set(cast(portfolio as jsonb), '{%s,shares}', %s, true) WHERE email =%s",(AsIs(tickr),new_shares_str,usr_email))
            conn.commit() 

        #return updated portfolio
        cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,)) 
        port = cur.fetchone()
        port_dict = port[0]
        return jsonify(port_dict) 


#Fetch user portfolio
@portfolio_bp.route("/my_portfolio", methods=['GET','POST'])
@jwt_required
def fetchPortfolio():
    cur = conn.cursor()

    usr_email = get_jwt_identity()
    if not usr_email:
        return jsonify({"err_msg":"Couldn't verify user."}), 403
    
    cur.execute("SELECT portfolio FROM users WHERE email=%s",(usr_email,))
    usr_portfolio = cur.fetchone()
    return jsonify(usr_portfolio)

