const express = require("express");
const router = express.Router();

//Ejemplo 1: Esperamos que el cliente nos envie por la URL como parametro un nombre. 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //¿Que ocurre si el cliente ingresa solo numeros o caracteres especiales en lugar de palabras? 
    
    //Para solucionar este problema y recibir solo los parametros esperados podemos usar las expresiones regulares. 

    let cliente = req.params.cliente;
    res.send("Cliente: " + cliente);
})

//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    let email = req.params.email; 
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const patronCorreo = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    //Entre barras. ojota! Acá validamos que el email sea de "gmail". 


    if(patronCorreo.test(email)) {
        res.send("Email valido: " + email);
    } else {
        res.send("Email inválido, en 3 dias tendras una mala noticia");
    }
})

//Validando parámetros
//Supongamos que al crecer mi aplicación, voy a tener que generar rutas que reciben el mismo parámetro. 

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parámetro cliente. 
    res.send("Obteniendo un recurso para el cliente : "  + req.params.cliente );
})

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parámetro cliente. 
    res.send("Enviando un recurso para el cliente : "  + req.params.cliente );
})

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parámetro cliente. 
    res.send("Actualizando un recurso para el cliente : "  + req.params.cliente );
})

router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parámetro cliente. 
    res.send("Eliminando un recurso para el cliente : "  + req.params.cliente );
})


//Nos encontramos que en los 4 métodos hay lineas de código que son iguales y se van a repetir: 
//a) obtener el parametro cliente
//b) buscar el cliente en la base de datos. 
//c) una vez validado, continuar con la operacion que corresponda. 

//Esto lo podemos simplificar creando un middleware llamado "router.param"

router.param("cliente", (req, res, next, cliente) => {
    //Mi mini base de datos es esta: 
    const arrayClientes = ["firulais", "lionel", "pepe"];

    if(arrayClientes.includes(cliente)) {
        req.cliente = cliente;
        next();
    } else {
        res.status(404).send("Cliente no encontrado");
    }
})

module.exports = router; 