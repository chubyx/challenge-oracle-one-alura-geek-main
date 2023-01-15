import { productServices } from "../services/product-services.js"

const listarTodosProductos = (productos, categoria) => {
    const lista = document.querySelector('#lista-todos-productos')

    productos.forEach(producto => {
        const li = document.createElement('li')
        const contenido = `
       
        <img src="${producto.img}" alt="">
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <a href="../descripcion.html?id=${producto.id}&categoria=${categoria}">Ver producto</a>
        `
        li.innerHTML = contenido
        lista.appendChild(li)
    })

}

productServices.listaCategoria()
    .then(categorias => {
        categorias.forEach(categoria => {
            listarTodosProductos(categoria.productos, categoria.id)
        })
    })
   