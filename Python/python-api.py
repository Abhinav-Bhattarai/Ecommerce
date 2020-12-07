import flask
from flask import jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/process', methods=['GET'])
def home():
    return jsonify({'data': True})

app.run()