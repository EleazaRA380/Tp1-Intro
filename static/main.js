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

//manejo de la respuesta al apretar perzonalizar
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

botonUsuario()
botonPersonalizar()
