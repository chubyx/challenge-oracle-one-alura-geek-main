import { publicarProducto } from "../controllers/agregar.producto.js"

const url =  document.querySelector("[data-form-add-url]")
const categoria =  document.querySelector("[data-form-add-category]")
const nombre =  document.querySelector("[data-form-add-name]")
const precio = document.querySelector("[data-form-add-price]")
const descripcion = document.querySelector("[data-form-add-desc]")
const maxMg = 120;
const maxNm = 20;
const min = 3;

url.addEventListener('blur',()=>validar(url,200,'url'))
url.addEventListener('keyup',()=>validar(url,200,'url'))

categoria.addEventListener('blur',()=>validar(categoria,20,'categoria'))
categoria.addEventListener('keyup',()=>validar(categoria,20,'categoria'))

nombre.addEventListener('blur',()=>validar(nombre,20,'nombre'))
nombre.addEventListener('keyup',()=>validar(nombre,20,'nombre'))

precio.addEventListener('blur',()=>validar(precio,20,'precio'))
precio.addEventListener('keyup',()=>validar(precio,20,'precio'))

descripcion.addEventListener('blur',()=>validar(descripcion,150,'descripcion'))
descripcion.addEventListener('keyup',()=>validar(descripcion,150,'descripcion'))
const msg_error=document.querySelector('#mensaje-error')
const formulario = document.querySelector('#form__agregar')
const bandera = {
    url:false,
    categoria:false,
    nombre:false,
    precio:false,
    descripcion:false
}
formulario.addEventListener('submit',e=>{
    e.preventDefault();
    validar(url,200,'url')
    validar(categoria,20,'categoria');
    validar(nombre,30,'nombre')
    validar(precio,10,'precio');
    validar(descripcion,200,'descripcion')
    if(bandera.url&&bandera.categoria&&bandera.nombre&&bandera.precio&&bandera.descripcion){
        publicarProducto(url.value,categoria.value,nombre.value,precio.value,descripcion.value)
    }
})

const validar = (elemento,max,texto)=>{
  
    msg_error.innerHTML=''
    const nombre = elemento.value.trim();
    if(nombre===""||nombre.length>max||nombre.length<min){
        console.log("nombre no valido");
        elemento.setCustomValidity(`El campo ${texto} no es valido`)
        elemento.parentElement.classList.remove('valido')
        elemento.classList.remove('valido')
        elemento.parentElement.classList.add('no-valido')
        elemento.classList.add('no-valido')
        msg_error.innerHTML= obtenerMensajes(texto)
    }
    else{
        bandera[texto]=true
        elemento.setCustomValidity(``)
        elemento.parentElement.classList.remove('no-valido')
        elemento.classList.remove('no-valido')
        elemento.parentElement.classList.add('valido')
        elemento.classList.add('valido')
        
    }
    
}

const obtenerMensajes= (input)=>{
    let mensaje =''
    switch (input){
        case 'url':
            mensaje='La url no es valida, debe tener entre 5 y 200 caractes'
        break
        case 'categoria':
            mensaje= 'La categoria no es valida, debe tener entre 3 y 20 caracteres'
        break;
        case 'nombre':   
            mensaje= 'La categoria no es valida, debe tener entre 3 y 20 caracteres'
        break;
        case 'precio':
            mensaje= 'El precio debe ser mayor a cero'
        break;
        case 'descripcion':
            mensaje='La descripcion no debe tener mas de 150 caracteres'
        break
    }
    return mensaje
}