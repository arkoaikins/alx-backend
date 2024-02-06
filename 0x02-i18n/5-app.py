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


def get_user(user_id):
    """
    Gets user by id
    """
    return users[user_id]

@app.before_request
def before_request() -> None:
    """
    executed before all other functions(gets user).
    """
    user_id = request.args.get('login_as')
    g.user = get_user(int(user_id)) if user_id else None


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
    user = g.user['name'] if g.user else None
    return render_template("5-index.html", user=user)


if __name__ == "__main__":
    app.run(debug=True)
