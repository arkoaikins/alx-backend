#!/usr/bin/env python3
"""
A basic flask app with a single route that renders to
index.html template
"""
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    """display home page"""
    return render_template("0-index.html")

if __name__ == "__main__":
    app.run(debug=True)