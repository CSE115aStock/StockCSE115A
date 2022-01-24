import psycopg2
import argparse
import os
import sys
import json
import re

from dotenv import load_dotenv, find_dotenv
from pathlib import Path
from psycopg2.extras import RealDictCursor
from passlib.hash import bcrypt
from flask import Flask, Blueprint, flash, redirect, url_for, render_template, current_app, request, session

#load db connection config
load_dotenv(find_dotenv())   

HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
DB_NAME = os.getenv('DB_NAME')
USR = os.getenv('USR')
PASSWORD = os.getenv('PASSWORD')

#connect to user DB
conn = psycopg2.connect(dbname=DB_NAME,user=USR,password=PASSWORD,host=HOST,port=PORT)    
cur = conn.cursor()

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

def IsValidPassword(str):
    regex = ("^(?=.*[a-z])(?=." +
                     "*[A-Z])(?=.*\\d)" +
                     "(?=.*[-+_!@#$%^&*., ?]).+$")
    # Compile the ReGex
    p = re.compile(regex)

    # If the string is empty
    # return false
    if (len(str) < 8):
        return False

    # return true if string matches ReGex
    if (re.search(p, str)):
        return True
    else:
        return False

#Adds user to DB
@auth_bp.route('/signup',methods=['GET','POST'])
def AddUser(cur, f_name,l_name,email,username,p_word):
    cur = conn.cursor()

    if request.method == 'POST':
        f_name = str(request.form['first_name'])
        l_name = str(request.form['last_name'])
        email = str(request.form['email'])
        username = str(request.form['username'])
        p_word = str(request.form['password'])
        
        error = None

        if not f_name:
            error = 'First name is required.'
        elif not l_name:
            error = 'Last name is required.'
        elif not email:
            error = 'Email is required.'
        elif not username:
            error = 'Username is required.'
        elif not p_word:
            error = 'Password is required.'
        
        cur.execute('SELECT * from users where username = %(usr)s', {'usr': username})
        if cur.fetchone() != None:
            error = 'User is already registered.'
        
        if IsValidPassword(p_word) == False:
            error = 'Password not strong enough.'
        
        if error == None:
            cur.execute("INSERT INTO users VALUES (%s, %s, %s, %s, %s)", (f_name, l_name,email,username,bcrypt.hash(p_word)))
            conn.commit()
            current_app.logger.info("User %s has been created succesfully.", username)
            return redirect(url_for('auth.login'))

        current_app.logger.error(error)
        flash(error)
    #set template


#Checks if user credentials match a user entry in the DB.
#Returns user if correct username and password combination are passed
#Returns false otherwise.
@auth_bp.route("/login", methods=['GET','POST'])
def AuthenticateUser(cur,username,p_word):
    cur.execute('SELECT * from users where username = %(usr)s', {'usr': username})
    user = cur.fetchone()
    error = None

    if not user:
        error = 'Invalid username'
    else:    
        hashed_pword = user[4]
        if not check_password(p_word,hashed_pword):
            error = 'Invalid password'
        
    if error != None:
        session['USERNAME'] = user[3]
        current_app.logger.info("Succesful login by user: %s", user[3])
        return json.dumps(user)
        #set redirect url to home page
    
    current_app.logger.error(error)
    flash(error)
    #set template


#Checks if entered password matches hashed password in the db. 
def check_password(plain_password, hashed_password):
    return bcrypt.verify(plain_password, hashed_password)


#temp function to test connection with frontend
#fetches sample user from the db
@auth_bp.route("/user")
def fetch_user():
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM users where first_name='john'")
    usr = cur.fetchone()
    return json.dumps(usr)

