import { productServices } from "../services/product-services.js";

const crearSeccion = (nombre) =>{
    const main_categorias = document.querySelector('#main-categorias')
    const section = document.createElement('section')
    section.classList.add('section')
    const contenido = `
        <div class="section-titulo">
            <h2>${nombre}</h2>
            <a class="section-ver-todo" href="./productos.html">Ver todo<img src="./img/flecha.png" alt="flecha"></a>   
        </div>
        <div>
            <ul class="lista ${nombre}">
            </ul>
        </div> 
    `
    section.innerHTML = contenido
    main_categorias.appendChild(section)
}

const crearSecciones = (categorias)=>{
    categorias.forEach(categoria=>{
        if(categoria.productos.length!==0){
            crearSeccion(categoria.id)
        }
    })
    return categorias
}

const crearProducto = (producto,categ)=>{
    const li =  document.createElement('li')
    const contenido = `
        <img src="${producto.img}" alt="">
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <a href="../descripcion.html?id=${producto.id}&categoria=${categ}">Ver producto</a>
    `
    li.innerHTML = contenido
    return li
}
const crearProductos = (productos,nombre)=>{
    const lista  =  document.querySelector(`.${nombre}`)
    for (let i = 0; i < productos.length; i++) {
        lista.appendChild(crearProducto(productos[i],nombre))
        if(i==5){
            //Para solo mostrar los primeros 6 elementos
            //en la pagina princila
            break
        }   
    }
}


productServices.listaCategoria()
    .then(categorias=>{return crearSecciones(categorias)})
    .then(categorias=>{
        categorias.forEach(categoria => {
            crearProductos(categoria.productos,categoria.id)
        });
    })


 const crearProductosBuscados = (productos,nombre,palabra)=>{
     const lista  =  document.querySelector(`.${nombre}`)
     // console.log(section);
     let bandera = false;
     productos.forEach(producto=>{
         let nombre = producto.nombre.toLowerCase()
         if(nombre.includes(palabra.toLowerCase())){
             lista.appendChild(crearProducto(producto))
             bandera=true
         }         
     })
     if(!bandera){
         lista.innerHTML = `<h2>No se encontrarion coincidencias en la categoria</h2>`
     }    
 }

const buscador__button = document.querySelector('#buscador__button')
const buscador = document.querySelector('#buscador')
console.log(buscador);
buscador__button.addEventListener('click',e=>{
    e.preventDefault();
    const main_categorias = document.querySelector('#main-categorias')
    main_categorias.innerHTML =""
    productServices.listaCategoria()
    .then(categorias=>{return crearSecciones(categorias)})
    .then(categorias=>{
        categorias.forEach(categoria => {
            crearProductosBuscados(categoria.productos,categoria.id,buscador.value)
        });
    })
})

