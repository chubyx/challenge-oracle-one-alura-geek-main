import { productServices } from "../services/product-services.js";

const url_data = new URL(window.location)
const categoria_data = url_data.searchParams.get("categoria")
const id_data = url_data.searchParams.get("id")
console.log(categoria_data);
console.log(id_data);



const listarTodosProductos = (productos, categoria, id_data) => {
    const lista = document.querySelector('#lista-todos-productos')

    productos.forEach(producto => {
        if (producto.id != id_data) {
            const li = document.createElement('li')
            const contenido = `
     
        <img src="${producto.img}" alt="">
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <a href="../descripcion.html?id=${producto.id}&categoria=${categoria}">Ver producto</a>
        `
            li.innerHTML = contenido
            lista.appendChild(li)
        }

    })

}
const mostrarDatos = (datos) => {
    const imagen = document.querySelector('[data-img-detalle]')
    const descripcion = document.querySelector('[data-desc-detalle]')
    const nombre = document.querySelector('[data-desc-nombre]')
    const precio = document.querySelector('[data-desc-precio]')
    imagen.src = datos.img
    descripcion.innerText = datos.descripcion
    nombre.innerText = datos.nombre
    precio.innerText = `$${datos.precio}`
}


productServices.listaCategoria()
    .then(categorias => {
        const categoria = categorias.filter(e => e.id == categoria_data)
        const datos = categoria[0].productos.filter(c => c.id == id_data)
        mostrarDatos(datos[0])
        return categorias
    })
    .then(categorias => {
        categorias.forEach(element => {
            if (element.id == categoria_data) {
                listarTodosProductos(element.productos, categoria_data, id_data)
            }
        });
    })