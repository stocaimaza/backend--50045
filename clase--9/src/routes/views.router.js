const express = require("express");
const router = express.Router();

const arrayProductos = [
    {nombre: "Fideos", descripcion: "Los mas ricos", precio: 100},
    {nombre: "Arroz", descripcion: "El que no se pasa", precio: 200},
    {nombre: "Helado", descripcion: "Mas frio que el corazón de tu ex", precio: 100}
]


//Rutas: 

router.get("/plantilla", (req, res) => {
    const usuario = {
        nombre: "Tinki",
        apellido: "Winki",
        mayorEdad: false
    }

    res.render("index", {titulo: "Es un titulo", usuario, arrayProductos });
})

router.get("/contacto", (req, res) => {
    res.render("contacto");
})

//layout: la carpeta layouts suele contener plantillas que actuan como diseños principales para tu aplicación. Entonces acá podemos colocar la estructura básica de un HTML, como el header, head, footer. 

//partials: son fragmentos de código que vamos a reutilizar. 


module.exports = router; 
