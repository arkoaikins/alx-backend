#!/usr/bin/env python3
"""
task 0: A basic flask app with a single route that renders to
index.html template
task 1:use babel to help with default locale(lang) and timezone
"""
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """
    Class config to set Babels default local
    and timezone
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
babel = Babel(app)
app.config.from_object(Config)


@app.route("/")
def index():
    """display home page"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run(debug=True)
