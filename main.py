from flask import Flask, request, jsonify, render_template, session
from flask_sqlalchemy import SQLAlchemy
from models import db2, Usuario, Personalizacion
from sqlalchemy import exists
from weather import clima_app


app = Flask(__name__, static_folder='static', static_url_path='/static')
port = 5000

app.register_blueprint(clima_app, url_prefix='/clima')

user_id = 0

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://usuario:12345678@localhost:5432/db2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de la extensión SQLAlchemy
db2.init_app(app)

# Rutas
@app.route('/')
def index():
    return render_template('indexbase.html')

@app.route('/index')
def index2():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

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
    try:
        with app.app_context():
            usuario = request.form['username']
            contrasena = request.form['password']

            # Validar si el usuario y la contraseña existen en la base de datos
            user = Usuario.query.filter_by(usuario=usuario).first()

            if user and user.contrasena == contrasena:
                # Autenticación exitosa
                global user_id
                user_id = user.id
                return render_template('index.html')  # Redirigir a la página de dashboard
            else:
                # Autenticación fallida
                return render_template('/login.html') , 401 

    except Exception as e:
        print(f'Error en la autenticación: {str(e)}')
        return render_template('/login.html') , 500

#ruta para verificar si un usuario existe
@app.route('/check_username/<string:username>', methods=['GET'])
def check_username(username):
    try:
        with app.app_context():
        # Verificar si existe algún usuario con el nombre de usuario dado
            user_exists = db2.session.query(exists().where(Usuario.usuario == username)).scalar()

            if user_exists:
                return jsonify({'message': 'El nombre de usuario ya está en uso'}), 200
            else:
                return jsonify({'message': 'El nombre de usuario está disponible'}), 200

    except Exception as e:
        print(f'Error al verificar el nombre de usuario: {str(e)}')
        return jsonify({'message': 'Error interno del servidor'}), 500

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
            nueva_personalizacion = Personalizacion(
                viento=True,
                lluvia=True,
                humedad=True,
                temperatura=True,
                sensacionTermica=True
            )
            db2.session.add(nueva_personalizacion)
            db2.session.commit()
            new_usuario = Usuario(usuario=usuario, contrasena=contrasena, personalizacion=nueva_personalizacion)
            db2.session.add(new_usuario)
            db2.session.commit()
            session['user_id'] = new_usuario.id 
            return jsonify({
                'usuario': {
                    'id': new_usuario.id,
                    'usuario': new_usuario.usuario,
                    'contrasena': new_usuario.contrasena,
                    'personalizacion_id': nueva_personalizacion.id 
                }
            }), 201
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Internal server error'}), 500


# Ruta para obtener todas la personalizacion del usuario
@app.route('/usuarios/personalizacion', methods=['GET'])
def get_personalizacion_usuario():
    global user_id
    try:
        usuario = Usuario.query.filter_by(id=user_id).first()
        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404
        personalizacion = usuario.personalizacion
        if not personalizacion:
            return jsonify({'message': 'Personalización no encontrada para este usuario'}), 404
        personalizacion_data = {
            'id': personalizacion.id,
            'viento': personalizacion.viento,
            'lluvia': personalizacion.lluvia,
            'humedad': personalizacion.humedad,
            'temperatura': personalizacion.temperatura,
            'sensacionTermica': personalizacion.sensacionTermica,
        }
        return jsonify({'personalizacion': personalizacion_data})
    except Exception as error:
        print('Error:', error)
        return jsonify({'message': 'Error interno del servidor'}), 500

# Iniciar la aplicación Flask
if __name__ == '__main__':
    with app.app_context():
        db2.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)