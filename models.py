from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

db2 = SQLAlchemy()


class Usuario(db2.Model):
    __tablename__ = 'usuarios'
    id = db2.Column(db2.Integer, primary_key=True)
    usuario = db2.Column(db2.String(255), nullable=False, unique=True)
    contrasena = db2.Column(db2.String(20), nullable=False)
    personalizacion_id = db2.Column(db2.Integer, db2.ForeignKey('personalizaciones.id'), nullable=False)
    personalizacion = db2.relationship('Personalizacion', backref='usuario', uselist=False)

class Personalizacion(db2.Model):
    __tablename__ = 'personalizaciones'
    id = db2.Column(db2.Integer, primary_key=True)
    viento = db2.Column(db2.Boolean, default=False)
    lluvia = db2.Column(db2.Boolean, default=False)
    humedad = db2.Column(db2.Boolean, default=False)
    temperatura = db2.Column(db2.Boolean, default=False)
    sensacionTermica = db2.Column(db2.Boolean, default=False)

if __name__ == '__main__':
    app.run(debug=True)