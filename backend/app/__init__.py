# app/__init__.py

from flask import Flask

app = Flask(__name__)

from . import main
from . import weather
from . import models
