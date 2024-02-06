#!/usr/bin/env python3
"""
task 0:A basic flask app with a single route that renders to
index.html template
task 1: use babel to help with default locale(lang) and timezone
task 2 :add a function to determine the best match with our
supported languages
task 3: Prametrize templates
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel
from typing import Union, Dict


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

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[Dict, None]:
    """
    Gets user by id
    """
    login_id = request.args.get('login_as')
    if login_id:
        return users.get(int(login_id))
    return None


@app.before_request
def before_request() -> None:
    """
    executed before all other functions.
    """
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale():
    """determines the best match with our supported lang"""
    locale = request.args.get("locale")
    if locale in app.config["LANGUAGES"]:
        return locale
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/")
def index():
    """display home page"""
    return render_template("4-index.html")


if __name__ == "__main__":
    app.run(debug=True)
