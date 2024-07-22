function verifyRegister() {
  const password=document.getElementById("userPass").value;
  const confirm_password=document.getElementById("repeatUserPass").value;
  const error_element=document.getElementById("errorMessage");
  const user=document.getElementById("userName").value;
  var itsvalid=false;
  if(user.length<=18){
    if(password.length<=10){
      if (password === confirm_password){
        itsvalid=true; // Las contraseñas coinciden"
        
      }   
      else{
        error_element.textContent="passwords are not the same."; 
        // Las contraseñas no coinciden
      }
    }
    else{ 
      error_element.textContent="The password cannot be longer than 10 characters.";
    }
  }
  else{
    error_element.textContent="The username cannot be longer than 18 characters.";
  }

  return itsvalid;
}

function registerUsuario() {
  var userName = document.getElementById("userName").value;
  var userPass = document.getElementById("userPass").value;
  var repeatUserPass = document.getElementById("repeatUserPass").value;

  if (userPass !== repeatUserPass) {
      document.getElementById("errorMessage").innerText = "Passwords do not match";
      return false;
  }

  var formData = {
      userName: userName,
      userPass: userPass
  };

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
      console.error('Error:', error);
      
  });

  return false; 
}