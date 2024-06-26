function RainDelay(raindrops){
  for ( var index = 0; index < raindrops.length; index++) {
    var raindrop=raindrops[index];
    raindrop.style.animationDelay = `${index * 0.7}s`; 
  }
}

const raindrops=document.querySelectorAll('.raindrop');
RainDelay(raindrops);


function verifyPasswords(password, confirmPass) {
  const error_element=document.getElementById('errorMessage');
  if (password.value === confirmPass.value) {
    return true; // Las contraseñas coinciden
  } else {
    error_element.textContent='passwords are not the same';
    return false; // Las contraseñas no coinciden
  }
}
