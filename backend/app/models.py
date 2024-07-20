# app/models.py
from . import app
import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(255), nullable=False)
    contrasena = db.Column(db.String(20), nullable=False)
    personalizaciones = db.relationship("Personalizacion")

class Personalizacion(db.Model):
    __tablename__ = 'personalizaciones'
    id = db.Column(db.Integer, primary_key=True)
    viento = db.Column(db.Boolean, default=False)
    lluvia = db.Column(db.Boolean, default=False)
    humedad = db.Column(db.Boolean, default=False)
    presionAtmosferica = db.Column(db.Boolean, default=False)
    sensacionTermica = db.Column(db.Boolean, default=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))

