import { productServices } from "../services/product-services.js"

const listarTodosProductos = (productos, categoria) => {
    const lista = document.querySelector('#lista-todos-productos')

    productos.forEach(producto => {
        const li = document.createElement('li')
        const contenido = `
        <div class="borrar-editar">
            <button id="${producto.id}-${categoria}" class="ii ii-borrar" href="#"><ion-icon name="trash-outline"></ion-ico></button>
            <a href='../agregar-producto.html?categoria=${categoria}&id=${producto.id}'><button class="ii ii-editar"><ion-icon name="pencil-outline"></ion-icon></button></a>
        </div>
        <img src="${producto.img}" alt="">
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <a href="#">codigo: ${producto.id}</a>
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
    .then(e => {
        let botonesBorrar = document.querySelectorAll('.ii-borrar')
        botonesBorrar.forEach(boton => {
            boton.addEventListener('click', e => {
                e.preventDefault()
                Swal.fire({
                    title: 'Esta seguro de borrar el producto?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let spl = boton.id.split('-');
                        productServices.obtenerCategoria(spl[1])
                            .then(e => {
                                let productosFiltrados = e.productos.filter(producto => producto.id != spl[0])
                                //productServices.eliminarProducto()
                                return productosFiltrados
                            })
                            .then(e => productServices.agregarProducto(spl[1], e))
                    }
                })
            })
        })
    })





