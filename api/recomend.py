"""
this is for recomendation/market trend
"""
import json

import requests
from bs4 import BeautifulSoup as bs
from flask import Blueprint, jsonify, request
import talib
import yfinance as yf

recomend_BP = Blueprint("recomend", __name__, url_prefix="/recomend")


@recomend_BP.route("/recomendStocksTechnical", methods=["GET", "POST"])
def chec_list():
  if request.method == "POST":
    data = json.loads(request.data)
    pattern_function = getattr(talib, data["pattern"])
    for symbol in data["sylmbols"]:
      df = yf.download(symbol, start="2022-01-01", end="2022-02-18")
      results = pattern_function(
      df["Open"], df["High"], df["Low"], df["Close"]
      )
      last = results.tail(1).values[0]
      if last > 0:
        return jsonify({"response": "bullish"})
      elif last < 0:
        return jsonify({"response": "bearish"})
      else:
        return jsonify({"response": "None"})


@recomend_BP.route("/screener", methods=["GET", "POST"])
def screener():
  if request.method == "POST":
    data = json.loads(request.data)
    url = (
      "https://finviz.com/screener.ashx?"
      "v=111&"
      f"f={data['cap']},{data['exchange']},{data['dividend']},"
      f"{data['index']},{data['ind']},{data['pe']},"
      f"{data['volume']},{data['pattern']},"
      f"{data['floatShort']},{data['rsi']}"
      "&ft=4"
      f"&{data['order']}"
    )
    data = json.loads(request.data)
    headers = {
    "User-Agent": "Mozilla/5.0"}
    print(url)
    html = requests.get(url, headers=headers)
    soup = bs(html.content, "html.parser")
    main_div = soup.find("div", attrs={"id": "screener-content"})
    table = main_div.find("table")
    sub = table.findAll("tr")
    rows = sub[5].findAll("td")
    data = []
    for row in rows:
      link = row.a
      if link is not None:
        data.append(link.get_text())
    if data:
      data.pop(0)
    n = 11
    x = [data[i+1:i + n] for i in range(0, len(data), n)]
    return jsonify({"response":x})
