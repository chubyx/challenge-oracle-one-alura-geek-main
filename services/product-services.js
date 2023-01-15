const listaCategoria = ()=>{
    return fetch('http://localhost:3000/categorias')
        .then(respuesta=>respuesta.json())
}

const obtenerCategoria = (categoria) =>{
    return fetch(`http://localhost:3000/categorias/${categoria}`)
        .then(respuesta=>respuesta.json())
}

const agregarCategoria = (categoria) =>{
    return fetch('http://localhost:3000/categorias',
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(categoria)
        }
    )    
}

const listaProducto = (nombreCategoria)=>{
    return fetch(`http://localhost:3000/categorias/${nombreCategoria}?_limit=6`)
        .then(respuesta=>respuesta.json())
}


const agregarProducto =(categoria,productos)=>{
    return fetch(`http://localhost:3000/categorias/${categoria}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({productos})
    });
}

const eliminarProducto = (id,categoria)=>{
    console.log('eliminar a --> '+id);
    return fetch(`http://localhost:3000/${categoria}/${id}`,{
        method: 'DELETE'
    })
}

export const productServices = {
    listaCategoria,
    listaProducto,
    agregarCategoria,
    agregarProducto,
    obtenerCategoria,
    eliminarProducto
}