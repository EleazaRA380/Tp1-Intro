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


botonUsuario()
botonPersonalizar()