const inputName =  document.querySelector("[data-form-message-nombre]")
const inputMessage = document.querySelector("[data-form-message-mg]")
const maxMg = 120
const maxNm = 40;
const min = 5;

inputName.addEventListener('blur',()=>validar(inputName,maxNm,'nombre'))
inputName.addEventListener('keyup',()=>validar(inputName,maxNm,'nombre'))
inputMessage.addEventListener('blur',()=>validar(inputMessage,maxMg,'mensaje'))
inputMessage.addEventListener('keyup',()=>validar(inputMessage,maxMg,'mensaje'))

const formulario = document.querySelector('#formulario__message')
formulario.addEventListener('submit',e=>{
    e.preventDefault();
    validar(inputName,maxNm,'nombre')
    validar(inputMessage,maxMg,'nombre');
})

const validar = (elemento,max,texto)=>{
    // elemento.addEventListener('keydown',(e)=>{
    //     console.log(e.key);
        
    // })
    const nombre = elemento.value.trim();
    if(nombre===""||nombre.length>max||nombre.length<min){
        console.log("nombre no valido");
        elemento.setCustomValidity(`El ${texto} ingresado no es valido`)
        elemento.parentElement.classList.remove('valido')
        elemento.classList.remove('valido')
        elemento.parentElement.classList.add('no-valido')
        elemento.classList.add('no-valido')
        
    }
    else{
        elemento.setCustomValidity(``)
        elemento.parentElement.classList.remove('no-valido')
        elemento.classList.remove('no-valido')
        elemento.parentElement.classList.add('valido')
        elemento.classList.add('valido')
    }
    
}

