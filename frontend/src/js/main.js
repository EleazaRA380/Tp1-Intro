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



botonUsuario()
botonPersonalizar()