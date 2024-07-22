from flask import Flask, request, jsonify, render_template, session
from flask_sqlalchemy import SQLAlchemy
from models import db2, Usuario, Personalizacion

app = Flask(__name__, static_folder='static', static_url_path='/static')
port = 5000

user_id = 0

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://usuario:12345678@localhost:5432/db2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de la extensión SQLAlchemy
db2.init_app(app)

# Ruta inicial
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index')
def index2():
    return render_template('index2.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    try:
        with app.app_context():
            usuarios = Usuario.query.all()
            usuarios_data = []
            for usuario in usuarios:
                usuario_data = {
                    'id': usuario.id,
                    'usuario': usuario.usuario,
                    'contrasena': usuario.contrasena,
                    'personalizacion': None
                }
                if usuario.personalizacion:
                    usuario_data['personalizacion'] = {
                        'id': usuario.personalizacion.id,
                        'viento': usuario.personalizacion.viento,
                        'lluvia': usuario.personalizacion.lluvia,
                        'humedad': usuario.personalizacion.humedad,
                        'temperatura': usuario.personalizacion.temperatura,
                        'sensacionTermica': usuario.personalizacion.sensacionTermica,
                    }
                usuarios_data.append(usuario_data)
            return jsonify({'usuarios': usuarios_data})
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500

# Ruta para actualizar una personalización específica (toggle)
@app.route('/toggle-personalizacion/<string:campo>', methods=['POST'])
def toggle_personalizacion(campo):
    global user_id
    try:
        if not user_id:
            return jsonify({'message': 'Usuario no autenticado'}), 401
        
        usuario = Usuario.query.get(user_id)
        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        personalizacion = usuario.personalizacion
        if not personalizacion:
            return jsonify({'message': 'Personalización no encontrada para este usuario'}), 404
        print("vientos: ",personalizacion.viento)
        # Actualizar el campo correspondiente
        if campo == 'viento':
            if(personalizacion.viento == False):
                personalizacion.viento = True
            else:
                personalizacion.viento = False
        elif campo == 'lluvia':
            if(personalizacion.lluvia == False):
                personalizacion.lluvia = True
            else:
                personalizacion.lluvia = False
        elif campo == 'humedad':
            if(personalizacion.humedad == False):
                personalizacion.humedad = True
            else:
                personalizacion.humedad = False
        elif campo == 'temperatura':
            if(personalizacion.temperatura == False):
                personalizacion.temperatura = True
            else:
                personalizacion.temperatura = False
        elif campo == 'sensacionTermica':
            if(personalizacion.sensacionTermica == False):
                personalizacion.sensacionTermica = True
            else:
                personalizacion.sensacionTermica = False

        db2.session.commit()

        return jsonify({'message': f'{campo} actualizado correctamente'}), 200
    except Exception as error:
        print('Error:', error)
        db2.session.rollback()
        return jsonify({'message': 'Error interno del servidor'}), 500

# Ruta para manejar la autenticación (método POST)
@app.route('/auth', methods=['POST'])
def auth():
        global user_id
  #  try:
        with app.app_context():
            usuario = request.form['username']
            contrasena = request.form['password']

            # Validar si el usuario y la contraseña existen en la base de datos
            user = Usuario.query.filter_by(usuario=usuario).first()
            user_id = user.id
                
            return render_template('index2.html')  # Redirigir a la página de dashboard o a otra página
           


# Ruta para agregar un nuevo usuario
@app.route('/usuarios/register', methods=['POST'])
def add_usuario():
    try:
        with app.app_context():
            data = request.json
            usuario = data.get('userName')
            contrasena = data.get('userPass')
            if not usuario or not contrasena:
                return jsonify({'message': 'Bad request, usuario or contrasena not found'}), 400
            
            # Crear una nueva personalización para el usuario
            nueva_personalizacion = Personalizacion(
                viento=True,
                lluvia=True,
                humedad=True,
                temperatura=True,
                sensacionTermica=True
            )
            db2.session.add(nueva_personalizacion)
            db2.session.commit()

            # Crear el nuevo usuario y asociarlo a la personalización creada
            new_usuario = Usuario(usuario=usuario, contrasena=contrasena, personalizacion=nueva_personalizacion)
            db2.session.add(new_usuario)
            db2.session.commit()
            session['user_id'] = new_usuario.id  # Establecer user_id en la sesión
            return jsonify({
                'usuario': {
                    'id': new_usuario.id,
                    'usuario': new_usuario.usuario,
                    'contrasena': new_usuario.contrasena,
                    'personalizacion_id': nueva_personalizacion.id  # Incluir el ID de la personalización asociada
                }
            }), 201
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500


# Ruta para obtener todas las personalizaciones

@app.route('/usuarios/personalizacion', methods=['GET'])
def get_personalizacion_usuario():
    global user_id
    try:
        # Buscar el usuario por su ID
        usuario = Usuario.query.filter_by(id=user_id).first()

        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        # Obtener la personalización asociada al usuario
        personalizacion = usuario.personalizacion

        if not personalizacion:
            return jsonify({'message': 'Personalización no encontrada para este usuario'}), 404

        # Crear un diccionario con los datos de la personalización
        personalizacion_data = {
            'id': personalizacion.id,
            'viento': personalizacion.viento,
            'lluvia': personalizacion.lluvia,
            'humedad': personalizacion.humedad,
            'temperatura': personalizacion.temperatura,
            'sensacionTermica': personalizacion.sensacionTermica,
        }

        # Devolver la respuesta JSON con los datos de la personalización
        return jsonify({'personalizacion': personalizacion_data})

    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Error interno del servidor'}), 500


# Ruta para agregar una nueva personalización
@app.route('/personalizaciones', methods=['POST'])
def add_personalizacion():
    try:
        with app.app_context():
            data = request.json
            viento = data.get('viento')
            lluvia = data.get('lluvia')
            humedad = data.get('humedad')
            temperatura = data.get('temperatura')
            sensacionTermica = data.get('sensacionTermica')
            if not viento or not lluvia or not humedad or not temperatura or not sensacionTermica:
                return jsonify({'message': 'Bad request, one or more fields are missing'}), 400
            new_personalizacion = Personalizacion(viento=viento, lluvia=lluvia, humedad=humedad,
                                                  temperatura=temperatura, sensacionTermica=sensacionTermica)
            db2.session.add(new_personalizacion)
            db2.session.commit()
            return jsonify({'personalizacion': {'id': new_personalizacion.id, 'viento': new_personalizacion.viento,
                                                'lluvia': new_personalizacion.lluvia, 'humedad': new_personalizacion.humedad,
                                                'temperatura': new_personalizacion.temperatura,
                                                'sensacionTermica': new_personalizacion.sensacionTermica}}), 201
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500

# Iniciar la aplicación Flask
if __name__ == '__main__':
    with app.app_context():
        db2.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)
