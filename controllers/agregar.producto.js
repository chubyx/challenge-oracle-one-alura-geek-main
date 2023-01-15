import { productServices } from "../services/product-services.js";

const crearCategoria = (categoria) => {
    productServices.agregarCategoria(categoria)
        .then(res => res)
}
const buscarCategoria = (categorias, categoria, producto, id_data) => {
    let bandera = false
    categorias.forEach(element => {
        if (element.id == categoria) {
            bandera = true
        }
    });
    if (!bandera) {
        crearCategoria({ id: categoria, productos: [producto] })
    } else {
        obtenerCategoria(categoria)
            .then(cat => {
                console.log(cat);
                agregarProducto(cat, producto, id_data)
            })
    }
    return categoria
}

const obtenerCategoria = (categoria) => {
    return productServices.obtenerCategoria(categoria)
        .then(categoria => categoria)
}

const agregarProducto = (categoria, producto, id_data) => {
    const arr = categoria.productos.filter(p => p.id != id_data)
    arr.push(producto)
    productServices.agregarProducto(categoria.id, arr)
        .then(res => res)
}
const url_data = new URL(window.location)
const categoria_data = url_data.searchParams.get("categoria")
let id_data = url_data.searchParams.get("id")

export const publicarProducto = (url, categoria, nombre, precio, descripcion) => {
    id_data = parseInt(id_data)
    if (id_data == null) {
        id_data = uuid.v4()
    }
    const producto = {
        img: url,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        id: id_data

    }

    productServices.listaCategoria()
        .then(categorias => { return buscarCategoria(categorias, categoria, producto, id_data) })
}



const obtenerInformacion = () => {
    
    console.log(categoria_data);
    console.log(id_data);
    if (id_data === null) {
        // window.location.href = '/screens/error.html'
        console.log('error');
        return null
    }
    const url = document.querySelector("[data-form-add-url]")
    const cat = document.querySelector("[data-form-add-category]")
    const nombre = document.querySelector("[data-form-add-name]")
    const precio = document.querySelector("[data-form-add-price]")
    const descripcion = document.querySelector("[data-form-add-desc]")

    try {
        const c = productServices.obtenerCategoria(categoria_data)
            .then(categoria => {
                const datosProducto = categoria.productos.filter(producto => producto.id == id_data)
                console.log(datosProducto);
                const obj = datosProducto[0]
                console.log(obj);
                if (obj.nombre && obj.img) {
                    url.value = obj.img
                    nombre.value = obj.nombre
                    cat.value = categoria_data
                    precio.value = obj.precio
                    descripcion.value = obj.descripcion
                } else {
                    throw new Error();
                    alert('Hubo un error')
                    window.location.href = '/screens/error.html'
                }
            })
    } catch (error) {
        console.log('Catch Error - ', error);
    }
}

obtenerInformacion()
