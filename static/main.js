//manejo del boton principal
function botonUsuario(){
    let boton = document.querySelector('#sboton')
    let listaBase = document.querySelectorAll('.selemento2')
    let listaPersonalizar = document.querySelectorAll('.selemento3')
    boton.addEventListener('click', function(){
        if (boton.classList.contains('sbotonclick')) {
            boton.classList.remove('sbotonclick')           
        } else {
            boton.classList.add('sbotonclick')
            listaPersonalizar.forEach(element => {
                element.classList.remove('smostrar')
            });
            listaBase.forEach(element => {
                element.classList.add('smostrar')
            });
        }
    })
}


function borrarUsuario() {
    fetch(`/usuarios`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al borrar usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuario borrado exitosamente:', data.message);
    })
    .catch(error => {
        console.error('Error al borrar usuario:', error.message);
    });
}

const botonBorrar = document.getElementById('borrarUsuarioButton');
botonBorrar.addEventListener('click', borrarUsuario);

//manejo de la respuesta al apretar personalizar
function botonPersonalizar(){
    let boton = document.querySelector('.spersonalizar')
    let lista = document.querySelectorAll('.selemento2')
    let nuevaLista = document.querySelectorAll('.selemento3')
    let botonUser = document.querySelector('#sboton')
    boton.addEventListener('click', function(){
        lista.forEach(element => {
            element.classList.remove('smostrar')
        });
        botonUser.classList.remove('sbotonclick')
        
        setTimeout(function(){
            nuevaLista.forEach(element => {
                element.classList.add('smostrar')
            });
            nuevaLista.forEach(element => {
                element.classList.add('smostrar')
            });
            botonUser.classList.add('sbotonclick')
        }, 750)
        
    })
}

function JbuscarClima() {
    document.querySelector('.Jcontainer').style.display = 'none';
    document.querySelector('.JContainerInfoClima').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', (event) => {
    const vientoBtn = document.getElementById('vientoBtn');
    const vientoDiv = document.getElementById('vientoDiv');

    vientoBtn.addEventListener('click', () => {
        if(vientoDiv.style.display === 'none' || vientoDiv.style.display === ''){
            vientoDiv.style.display = 'block';
        } else {
            vientoDiv.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const lluviaBtn = document.getElementById('lluviaBtn');
    const lluviaDiv = document.getElementById('lluviaDiv');

    lluviaBtn.addEventListener('click', () => {
        if(lluviaDiv.style.display === 'none' || lluviaDiv.style.display === ''){
            lluviaDiv.style.display = 'block';
        } else {
            lluviaDiv.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const sensTermicaBtn = document.getElementById('sensTermicaBtn');
    const sensTermicaDiv = document.getElementById('sensTermicaDiv');

    sensTermicaBtn.addEventListener('click', () => {
        if(sensTermicaDiv.style.display === 'none' || sensTermicaDiv.style.display === ''){
            sensTermicaDiv.style.display = 'block';
        } else {
            sensTermicaDiv.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const humedadBtn = document.getElementById('humedadBtn');
    const humedadDiv = document.getElementById('humedadDiv');

    humedadBtn.addEventListener('click', () => {
        if(humedadDiv.style.display === 'none' || humedadDiv.style.display === ''){
            humedadDiv.style.display = 'block';
        } else {
            humedadDiv.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const tempBtn = document.getElementById('tempBtn');
    const grados = document.getElementById('grados');

    tempBtn.addEventListener('click', () => {
        if(grados.style.display === 'none' || grados.style.display === ''){
            grados.style.display = 'block';
        } else {
            grados.style.display = 'none';
        }
    });
});

//función para cargar la ultima personalización del usuario
function cargarPersonalizacion() {
    fetch(`/usuarios/personalizacion`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar datos de personalización');
            }
            return response.json();
        })
        .then(data => {
            const personalizacion = data.personalizacion;
            let viento = personalizacion.viento;
            let lluvia = personalizacion.lluvia;
            let humedad = personalizacion.humedad;
            let temperatura = personalizacion.temperatura;
            let sensacionTermica = personalizacion.sensacionTermica;
            const vientoDiv = document.getElementById('vientoDiv');
            const lluviaDiv = document.getElementById('lluviaDiv');
            const humedadDiv = document.getElementById('humedadDiv');
            const grados = document.getElementById('grados');
            const sensTermicaDiv = document.getElementById('sensTermicaDiv');
            if(viento === true){
                vientoDiv.style.display = 'block';
            } else {
            vientoDiv.style.display = 'none';
            }
            if(lluvia === true){
                lluviaDiv.style.display = 'block';
            } else {
                lluviaDiv.style.display = 'none';
            }
            if(humedad === true){
                humedadDiv.style.display = 'block';
            } else {
                humedadDiv.style.display = 'none';
            }
            if(temperatura === true){
                grados.style.display = 'block';
            } else {
                grados.style.display = 'none';
            }
            if(sensacionTermica === true){
                sensTermicaDiv.style.display = 'block';
            } else {
                sensTermicaDiv.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//carga de la ultima personalización asociada al usuario
document.addEventListener('DOMContentLoaded', function() {
    cargarPersonalizacion();
});

    function JbuscarClima() {
        
        const input = document.getElementById('JInput').value;
    
        
        const regex = /^[a-zA-Z\s]+,\s*[a-zA-Z\s]*,\s*[a-zA-Z\s]+$/;
    
        if (!regex.test(input)) {
            alert('El formato de entrada debe ser: Ciudad, Estado o provincia, País');
            return;
        }
    
        const [city, state, country] = input.split(',').map(part => part.trim());
    
        const url = `http://localhost:5000/clima/weather/${encodeURIComponent(city)}-${encodeURIComponent(state)}-${encodeURIComponent(country)}`;
        
        console.log(url)

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud a la API');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); 
                mostrarClima(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('No se pudo obtener la información del clima. Por favor, intente de nuevo.');
            });

        document.querySelector('.Jcontainer').style.display = 'none';
        document.querySelector('.JContainerInfoClima').style.display = 'flex';
        document.querySelector('.spersonalizar').style.display = 'flex';
        document.querySelector('.spersonalizar').style.color = '#a1a1a1';
        

    }

    function mostrarClima(data) {
        if (data[0].location === "Not Found") {
            alert('Ubicación no encontrada. Por favor, verifique la entrada.');
            return;
        }
    
        const weather = data[0];
        
    
        
        document.getElementById('grados').innerHTML = `<strong>${weather.main.temp}ºC</strong>`;
    
        
        const climaIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        document.getElementById('climaImg').src = climaIcon;
        document.getElementById('climaImg').alt = weather.weather[0].description;
    
        
        document.getElementById('direccionVientoImg').alt = `Viento: ${weather.wind.deg}°`;
        document.getElementById('lluviaImg').alt = `Lluvia: ${weather.clouds.all}%`;
        document.getElementById('sensTermicaImg').alt = `Sensación Térmica: ${weather.main.feels_like}ºC`;
        document.getElementById('humedadImg').alt = `Humedad: ${weather.main.humidity}%`;
    
        
        document.querySelector('#vientoDiv .hover-text').innerText = `Viento: ${weather.wind.deg}° a ${weather.wind.speed} m/s`;
        document.querySelector('#lluviaDiv .hover-text').innerText = `Lluvia: ${weather.clouds.all}%`;
        document.querySelector('#sensTermicaDiv .hover-text').innerText = `Sensación Térmica: ${weather.main.feels_like}ºC`;
        document.querySelector('#humedadDiv .hover-text').innerText = `Humedad: ${weather.main.humidity}%`;
    }
    /*
    
    const vientoBtn = document.getElementById('vientoBtn');
    const vientoDiv = document.getElementById('vientoDiv');
    vientoBtn.addEventListener('click', () => {
    if(vientoDiv.style.display === 'none' || vientoDiv.style.display === ''){
    vientoDiv.style.display = 'block';
    } else {
    vientoDiv.style.display = 'none';
    }
    });
    
    const lluviaBtn = document.getElementById('lluviaBtn');
    const lluviaDiv = document.getElementById('lluviaDiv');
    lluviaBtn.addEventListener('click', () => {
    if(lluviaDiv.style.display === 'none' || lluviaDiv.style.display === ''){
    lluviaDiv.style.display = 'block';
    } else {
    lluviaDiv.style.display = 'none';
    }
    });
    
    const sensTermicaBtn = document.getElementById('sensTermicaBtn');
    const sensTermicaDiv = document.getElementById('sensTermicaDiv');
    sensTermicaBtn.addEventListener('click', () => {
    if(sensTermicaDiv.style.display === 'none' || sensTermicaDiv.style.display === ''){
    sensTermicaDiv.style.display = 'block';
    } else {
    sensTermicaDiv.style.display = 'none';
    }
    });
    
    const humedadBtn = document.getElementById('humedadBtn');
    const humedadDiv = document.getElementById('humedadDiv');
    humedadBtn.addEventListener('click', () => {
    if(humedadDiv.style.display === 'none' || humedadDiv.style.display === ''){
    humedadDiv.style.display = 'block';
    } else {
    humedadDiv.style.display = 'none';
    }
    });
    
    const tempBtn = document.getElementById('tempBtn');
    const grados = document.getElementById('grados');
    tempBtn.addEventListener('click', () => {
    if(grados.style.display === 'none' || grados.style.display === ''){
    grados.style.display = 'block';
    } else {
    grados.style.display = 'none';
    }
    });
    */


    
    const ciudadInput = document.getElementById('JInput');
    const buscarBtn = document.getElementById('JButtonBuscar');
    const ciudadTexto = document.getElementById('JCiudad');
    
    buscarBtn.addEventListener('click', () => {
    const valor = ciudadInput.value;
    ciudadTexto.textContent = valor;/*
    vientoDiv.style.display = 'block';
    lluviaDiv.style.display = 'block';
    sensTermicaDiv.style.display = 'block';
    humedadDiv.style.display = 'block';
    grados.style.display = 'block';*/
    });
    

botonUsuario()
botonPersonalizar()
