const formularioProductos = document.getElementById("formularioProductos");

formularioProductos.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    //Me guardo los datos del formulario: 
    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;

    const data = {
        nombre: nombre, 
        categoria: categoria,
        precio: precio
    }

    const response = await fetch("http://localhost:8080/productos", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        alert("Tenemos un error, tendras una mala noticia hoy");
    }

    //Limpiamos el formulario: 
    formularioProductos.reset();
})


//Vemos el listado de productos: 

const verListadoBtn = document.getElementById("verListado");
const listadoProductos = document.getElementById("listadoProductos");

verListadoBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:8080/productos");
        const productos = await response.json(); 

        //Los enviamos a una función para renderizar: 
        renderizarProductos(productos);
    } catch (error) {
        console.log("Error al obtener los productos:", error)
    }
})

function renderizarProductos(productos) {
    listadoProductos.innerHTML = "";

    productos.forEach( producto => {
        const productoElemento = document.createElement("p");
        productoElemento.textContent = `Nombre: ${producto.nombre}, precio: ${producto.precio}`
        listadoProductos.appendChild(productoElemento);
    })
}