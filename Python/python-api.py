import flask
from flask import request
from flask import jsonify
import json
import requests

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/process', methods=['POST'])
def home():
    data = json.loads(request.data)
    return data

@app.route('/name', methods=['GET'])
def get_name():
    return jsonify({"hello": True})
app.run()