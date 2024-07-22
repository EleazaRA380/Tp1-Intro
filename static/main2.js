function botonUsuario(){
    let boton = document.querySelector('#sboton')
    let listaBase = document.querySelectorAll('.selemento1')
    boton.addEventListener('click', function(){

        if (boton.classList.contains('sbotonclick')) {
            boton.classList.remove('sbotonclick')
           
        } else {
            boton.classList.add('sbotonclick')
            listaBase.forEach(element => {
                element.classList.add('smostrar')
            
            });
        }
    })
}
/*
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
    }*/
    
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
    

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('JButtonBuscar').addEventListener('click', JbuscarClima);
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
    ciudadTexto.textContent = valor;
    vientoDiv.style.display = 'block';
    lluviaDiv.style.display = 'block';
    sensTermicaDiv.style.display = 'block';
    humedadDiv.style.display = 'block';
    grados.style.display = 'block';
    });
    
    
    
botonUsuario()
botonPersonalizar()
    
