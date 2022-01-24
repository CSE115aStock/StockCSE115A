import psycopg2
import argparse
import os
import sys
import json

from dotenv import load_dotenv, find_dotenv
from pathlib import Path
from psycopg2.extras import RealDictCursor
from passlib.hash import bcrypt
from flask import Flask

#load db connection config
load_dotenv(find_dotenv())   

HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
DB_NAME = os.getenv('DB_NAME')
USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASSWORD')

#connect to user DB
conn = psycopg2.connect(dbname=DB_NAME,user=USERNAME,password=PASSWORD,host=HOST,port=PORT)    
cur = conn.cursor()

app = Flask(__name__)

#Adds user to DB
@app.route("/newaccount")
def AddUser(cur, f_name,l_name,email,username,p_word):
    cur = conn.cursor()
    cur.execute("INSERT INTO users VALUES (%s, %s, %s, %s, %s)", (f_name, l_name,email,username,bcrypt.hash(p_word)))
    conn.commit()


#Checks if user credentials match a user entry in the DB.
#Returns user if correct username and password combination are passed
#Returns false otherwise.
def AuthenticateUser(cur,username,p_word):
    cur.execute('SELECT * from users where username = %(usr)s', {'usr': username})
    user = cur.fetchone()
    if not user:
        return False
    else:    
        hashed_pword = user[4]
        if not check_password(p_word,hashed_pword):
            return False
        
        return user

    
#Checks if entered password matches hashed password in the db. 
def check_password(plain_password, hashed_password):
    return bcrypt.verify(plain_password, hashed_password)


import time
from flask import Flask

app = Flask(__name__)

#temp function to test connection with frontend
#fetches sample user from the db
@app.route("/user")
def fetch_user():
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM users where first_name='john'")
    usr = cur.fetchone()
    return json.dumps(usr)


if __name__ == '__main__':
    app.run()
