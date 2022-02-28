"""
The following gives twtitter tweets on specific stock given querry
"""
import os
import requests
import pandas as pd
from dotenv import load_dotenv, find_dotenv

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

portfolio_bp = Blueprint("twitter", __name__, url_prefix="/twitter")
load_dotenv(find_dotenv())
bearer_token = os.getenv("bearer_token")

#the following formats the tweets in the propper form
def get_data(tweet):
  data = {
        "id": tweet["id"],
        "created_at": tweet["created_at"],
        "text": tweet["text"],
    }
  return data


@jwt_required()
def add_stock(data):
  query_params = {
        "query": data["query"] + " lang:en",
        "tweet.fields": "author_id,created_at",
    }
  search_url = "https://api.twitter.com/2/tweets/search/recent"
  response = requests.get(
        search_url,
        params=query_params,
        headers={"authorization": "Bearer " + bearer_token},
    )
  df = pd.DataFrame()
  for tweet in response.json()["data"]:
    row = get_data(tweet)
    df = df.append(row, ignore_index=True)
  return jsonify(df["text"])
