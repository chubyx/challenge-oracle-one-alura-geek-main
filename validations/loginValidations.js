const formulario__login = document.querySelector("#formulario__login")

const email =  document.querySelector('#correo')
const pass  =  document.querySelector('#password')
console.log(formulario__login);
const bandera = {
    email:false,
    password:false
}
formulario__login.addEventListener('submit',e=>{
    e.preventDefault();
    if(bandera.email&&bandera.password){
        window.location.href='../productos-admin.html'
    }
})
const mensajes = {
    correo : "El correo debe contener un @",
    contraseña: {
        corta: "La contraseña debe tener al menos 4 caractes",
        larga: "La contraseña debe tener como maximo 12 caractes"
    }
}
const error =document.querySelector('#mensaje-error')
const mostrarMensajeInformativo = (campo,input)=>{
    error.innerHTML = ""
    if (campo=='email'){
        console.log(mensajes.correo);
        error.innerHTML = mensajes.correo
    }
    if(campo=='password'){
        if(input.value.length<4){
            error.innerHTML = mensajes.contraseña.corta
        }else{
            error.innerHTML = mensajes.contraseña.larga
        }
    }
}

const expresiones = {
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo:  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ,
}

const validarCampo = (expresion, input,campo)=>{
    if(expresion.test(input.value)){
        input.setCustomValidity(``)
        input.parentElement.classList.remove('no-valido')
        input.classList.remove('no-valido')
        input.parentElement.classList.add('valido')
        input.classList.add('valido')
        error.innerHTML = "";
        bandera[campo] = true

    }else{
        input.setCustomValidity(`El ${campo} ingresado no es valido`)
        input.parentElement.classList.remove('valido')
        input.classList.remove('valido')
        input.parentElement.classList.add('no-valido')
        input.classList.add('no-valido')
        mostrarMensajeInformativo(campo,input)
        
    }
}
const validarFormulario =(e)=>{
    switch(e.target.name){
        case "email":
            validarCampo(expresiones.correo,e.target,'email')
        break;
        case "password":
            validarCampo(expresiones.password,e.target,'password')
        break;
    }
}
const inputs = document.querySelectorAll('input')
console.log(inputs);
inputs.forEach(input => {
    input.addEventListener('keyup',validarFormulario)
    input.addEventListener('blur',validarFormulario)
});