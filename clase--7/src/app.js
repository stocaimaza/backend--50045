/** CLASE 7 - EXPRESS AVANZADO **/

//Temas de hoy: 

//1) Codigos de estado. 
//2) ¿Que es una API? 
//3) API Rest. 
//4) Métodos de petición. 
//5) Postman
//6) Practicamos GET - POST - PUT - DELETE

//El servidor se comunica con el cliente por medio del modelo "cliente-servidor", en donde el cliente hace peticiones = request y el servidor da respuestas = response. Esta comunicación se hace bajo el protocolo HTTP. 

//1) Códigos de estado: 

//Se organizan en 5 clases: 

//Los que comienzan con 1xx: son respuestas informativas. 
//Los que comienzan con 2xx: son respuestas exitosas, la petición fue recibida, entendida y aceptada. 
//Los que comienzan con 3xx: redirecciones, el cliente necesita realizar algunas acciones adicionales. 
//Los que comienzan con 4xx: errores del cliente. 
//Los que comienzan con 5xx: errores del servidor. 

//Los más utilizados: 

//200. La petición fue exitosa. 
//400. Bad request. 
//401. Acceso no autorizado. 
//404. Not found, recurso no encontrado.
//500. Error interno del servidor. 

//2) ¿Que es una API? 

//API es el acrónimo de Application Programming Interface, o "interfaz de programación de aplicaciones".
//Es un conjunto de definiciones y reglas que permiten que dos equipos puedan integrarse para trabajar juntos. 

//3) API REST: 


//Los formatos más importantes son: 
//JSON: es un formato de texto sencillo para el intercambio de datos. 
//XML: Es un lenguaje de marcado creado para almacenar e intercambiar información. 

//¿Que caracteristica tiene que tener una API Rest? 

//1) Cada mensaje HTTP contiene toda la información necesaria para el servidor de respuesta. No hace falta que el servidor mantenga un historial de las peticiones. La relación esta debilmente acomplada, es decir el servidor se despreocupa de lo que haga el cliente con la respuesta. 

//2) Cacheable: el cliente puede hacer uso de la caché para respuestas. 

//3) Operaciones comunes: utiliza los métodos HTTP como GET, POST, PUT, DELETE. etc. 

//4) Interfaz uniforme, tiene que tener un identificador. 

//5) Utilización de hipermedios: los hipermedios son enlaces que permiten a los clientes navegar por los recursos de forma dinámica. 


/////////////////////////////////////////////////////////

//Basta de teoria, nos vamos a la práctica. 

const express = require("express");
const app = express(); 

const PUERTO = 8080; 


//Middleware (lo vemos en la clase 8).
app.use(express.urlencoded({extended:true}));
//Esto lo hacemos para que acepte datos complejos. 
app.use(express.json())
//Voy a utilizar JSON para mis datos. 

//Array de clientes: 

const clientes = [
    {id: "1", nombre: "Lionel", apellido: "Messi"},
    {id: "2", nombre: "Coky", apellido: "Argento"},
    {id: "3", nombre: "Jason", apellido: "Momoa"},
    {id: "4", nombre: "Jason", apellido: "Staham"},
    {id: "5", nombre: "Jason", apellido: "Viernes 13"},
    {id: "6", nombre: "Doble", apellido: "Luis Miguel"},
]

//Método get: 

app.get("/", (req, res) => {
    res.send(clientes);
})

//Variación para que retorne con limite: 

app.get("/conlimite/:limit", (req, res) => {
    const {limit} = req.params;
    

    const arrayConLimite = clientes.slice(0, parseInt(limit));
    res.send(arrayConLimite);
})

//Retorno un producto por id: 

app.get("/producto/:pid", (req, res) => {
    let {pid} = req.params; 
    const buscado = clientes.find(cliente => cliente.id == pid);

    if(buscado) {
        res.send(buscado);
    } else {
        res.send("No hay ningun cliente con ese id");
    }
})

//¿Que pasa si yo quiero agregar un nuevo cliente? 
//Trabajamos con una ruta post

app.post("/", (req, res) => {
    const clienteNuevo = req.body; 

    clientes.push(clienteNuevo);
    console.log(clientes);
    res.status(201).send({status:"success", message:"cliente nuevo creado"});
})


//Practicamos el PUT /:id en donde tomamos un cliente y actualizamos sus datos. Recuerden que los enviamos desde el body y no deben eliminar el ID. 

app.put("/:id", (req, res) => {
    const {id} = req.params; 
    const {nombre, apellido} = req.body;

    //Tengo que encontrar el cliente que tenga ese id: 

    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if(clienteIndex !== -1) {
        //Si el cliente existe, actualizo los datos: 
        clientes[clienteIndex].nombre = nombre; 
        clientes[clienteIndex].apellido = apellido; 

        console.log(clientes);
        res.status(201).send({status:"success", message:"cliente actualizado"});
    } else {
        //Si el cliente no se encuentra, tiro un mensaje: 
        res.status(404).send({status:"error", message: "Cliente no encontrado"});
    }
})

//Vamos a borrar un cliente: 

app.delete("/:id", (req, res) => {
    const {id} = req.params; 

    //Una vez que tengo el id, lo voy buscar a mi array. 
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if(clienteIndex !== -1) {
        //Si el cliente existe, lo elimino. 
        clientes.splice(clienteIndex, 1);

        console.log(clientes);
        res.status(201).send({status:"success", message:"cliente eliminado"});
    } else {
        //Si el cliente no se encuentra, tiro un mensaje: 
        res.status(404).send({status:"error", message: "Cliente no encontrado"});
    }
})





//No se olviden del listen!

app.listen(PUERTO, () => {
    console.log(`Escucuchando en http://localhost:${PUERTO}`);
});