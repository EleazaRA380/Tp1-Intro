//validacion de los campos de register y creación de un usuario
function registerUsuario() {
  let userName = document.getElementById("userName").value;
  let userPass = document.getElementById("userPass").value;
  let repeatUserPass = document.getElementById("repeatUserPass").value;

  if (userPass !== repeatUserPass) {
      document.getElementById("errorMessage").innerText = "Las contraseñas no coinciden";
      return false;
  }

  if (userPass.length < 4 || userPass.length > 18) {
      document.getElementById("errorMessage").innerText = "La contraseña debe tener entre 4 y 18 caracteres";
      return false;
  }

  if (userName.length < 4 || userName.length > 18) {
      document.getElementById("errorMessage").innerText = "El nombre de usuario debe tener entre 4 y 18 caracteres";
      return false;
  }
  let formData = {
      userName: userName,
      userPass: userPass
  };
  fetch('/check_username/' + userName)
      .then(response => response.json())
      .then(data => {
          if (data.message === 'El nombre de usuario está disponible') {
              fetch('/usuarios/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
              })
              .then(response => response.json())
              .then(data => {
                  console.log('Success:', data);
                  window.location.href = "/login"; 
              })
              .catch(error => {
                  console.error('Error al registrar usuario:', error);
                
              });
          } else {
              document.getElementById("errorMessage").innerText = "El nombre de usuario no esta disponible";
          }
      })
      .catch(error => {
          console.error('Error al verificar nombre de usuario:', error);
          document.getElementById("usernameAvailabilityMessage").innerText = 'Error al verificar nombre de usuario';
      });

  return false; 
}
