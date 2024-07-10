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
        window.location.href="../Login/index.html"
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