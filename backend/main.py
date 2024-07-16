

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, Usuario, Personalizacion

app = Flask(__name__)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://usuario:12345678@localhost:5432/db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración de la base de datos
db.init_app(app)

# Ruta inicial
@app.route('/')
def hello_world():
    return 'Hello world!'

# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    try:
        usuarios = Usuario.query.all()
        usuarios_data = []
        for usuario in usuarios:
            usuario_data = {
                'id': usuario.id,
                'usuario': usuario.usuario,
                'contrasena': usuario.contrasena,
                'personalizaciones': []
            }
            for personalizacion in usuario.personalizaciones:
                personalizacion_data = {
                    'id': personalizacion.id,
                    'viento': personalizacion.viento,
                    'lluvia': personalizacion.lluvia,
                    'humedad': personalizacion.humedad,
                    'presionAtmosferica': personalizacion.presionAtmosferica,
                    'sensacionTermica': personalizacion.sensacionTermica,
                    'createdAt': personalizacion.created_at
                }
                usuario_data['personalizaciones'].append(personalizacion_data)
            usuarios_data.append(usuario_data)
        return jsonify({'usuarios': usuarios_data})
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500

# Ruta para agregar un nuevo usuario
@app.route('/usuarios', methods=['POST'])
def add_usuario():
    try:
        data = request.json
        usuario = data.get('usuario')
        contrasena = data.get('contrasena')
        if not usuario or not contrasena:
            return jsonify({'message': 'Bad request, usuario or contrasena not found'}), 400
        new_usuario = Usuario(usuario=usuario, contrasena=contrasena)
        db.session.add(new_usuario)
        db.session.commit()
        return jsonify({'usuario': {'id': new_usuario.id, 'usuario': new_usuario.usuario, 'contrasena': new_usuario.contrasena}}), 201
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500

# Ruta para obtener todas las personalizaciones
@app.route('/personalizaciones', methods=['GET'])
def get_personalizaciones():
    try:
        personalizaciones = Personalizacion.query.all()
        personalizaciones_data = []
        for personalizacion in personalizaciones:
            personalizacion_data = {
                'id': personalizacion.id,
                'viento': personalizacion.viento,
                'lluvia': personalizacion.lluvia,
                'humedad': personalizacion.humedad,
                'presionAtmosferica': personalizacion.presionAtmosferica,
                'sensacionTermica': personalizacion.sensacionTermica
            }
            personalizaciones_data.append(personalizacion_data)
        return jsonify({'personalizaciones': personalizaciones_data})
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500

# Ruta para agregar una nueva personalización
@app.route('/personalizaciones', methods=['POST'])
def add_personalizacion():
    try:
        data = request.json
        viento = data.get('viento')
        lluvia = data.get('lluvia')
        humedad = data.get('humedad')
        presionAtmosferica = data.get('presionAtmosferica')
        sensacionTermica = data.get('sensacionTermica')
        usuario_id = data.get('usuario_id')
        if not viento or not lluvia or not humedad or not presionAtmosferica or not sensacionTermica or not usuario_id:
            return jsonify({'message': 'Bad request, one or more fields are missing'}), 400
        new_personalizacion = Personalizacion(viento=viento, lluvia=lluvia, humedad=humedad,
                                              presionAtmosferica=presionAtmosferica, sensacionTermica=sensacionTermica,
                                              usuario_id=usuario_id)
        db.session.add(new_personalizacion)
        db.session.commit()
        return jsonify({'personalizacion': {'id': new_personalizacion.id, 'viento': new_personalizacion.viento,
                                            'lluvia': new_personalizacion.lluvia, 'humedad': new_personalizacion.humedad,
                                            'presionAtmosferica': new_personalizacion.presionAtmosferica,
                                            'sensacionTermica': new_personalizacion.sensacionTermica}}), 201
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500

# Iniciar la aplicación
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)
