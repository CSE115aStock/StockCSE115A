import psycopg2
import argparse
import os
import sys
import re

from dotenv import load_dotenv, find_dotenv
from pathlib import Path
from psycopg2.extras import RealDictCursor
from flask import Flask, Blueprint, flash, redirect, url_for, render_template, current_app, request, jsonify
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


