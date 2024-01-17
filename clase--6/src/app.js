/** CLASE 6 - SERVIDORES WEB **/

//Temas de hoy: 

//1) ¿Qué es un servidor? 
//2) Protocolo HTTP. 
//3) Modulo nativo de Node HTTP
//4) Express JS
//5) Objeto request
//6) Presentamos el desafío n°6 

///////////////////////////////////////

//Servidor: software o hardware que almacena y administra recursos web. Estos recursos pueden ser imágenes, archivos, sitios web, videos, datos. Su función es responder a las peticiones de los clientes. Es importante aclarar que un servidor puede responder a múltiples clientes al mismo tiempo. Esto se conoce como modelo cliente- servidor. 

//2) HTTP: significa "Hypertext Transfer Protocol" o "Protocolo de transferencia de hipertexto". Es un protocolo de comunicación, es decir un conjunto de reglas que definen como se comunican dos o más dispositivos. 

//3) Modulo Nativo HTTP: Es un módulo que viene por defecto en Node JS. Nos permite crear un servidor y enviar información a traves del protocolo HTTP. 

//paso previo: instalamos nodemon con el siguiente comando: 
//npm install nodemon -D
//Nodemon nos permite reiniciar automáticamente el servidor cuando detecta que hay cambios en el código. 


//Primer paso:  vamos a importar el módulo

const http = require("http");

//Segundo paso: vamos a crear el servidor web. Para eso vamos a utilizar el método createServer() del módulo http. 
//Este método recibe como parámetro una función callback que se va a ejecutar cada vez que se realice una petición al servidor. 


// const server = http.createServer( (request, response)=> {
//     console.log("Se realizó una petición al servidor"); 
//     response.end("Miren, estoy programando sin manos!");
// } )

//Tercer paso: vamos a poner a escuchar a nuestro servidor en un puerto. 

//PUERTO: ubicación espcial del sistema operativo en la cual puedo acceder a alguna aplicación o proceso específico. 

const PUERTO = 8080; 

// server.listen(PUERTO, () => {
//     // console.log("El servidor se esta escuchando en el puerto 8080");
//     console.log(`Escuchando en el http://localhost:${PUERTO}`);
// })

//4) Express JS: es un framework minimalista de Node JS que nos permite crear servidores web de una forma mucho más simple. 

//Instalamos con el comando: npm install express

//Importamos el módulo: 

const express = require("express");


//Creamos una aplicación de express. 

const app = express(); 

app.get("/", (req, res) => {
    //Cuando utilizo "/" estoy haciendo referencia a la ruta raíz de mi aplicación. 
    res.send("Mi respuesta desde Express");
})
//El método get() recibe como primer parámetro la ruta y como segundo parámetro una función callback que se ejecuta cada vez que se realiza una petición a esa ruta. 

//Practicamos con otras rutas (endpoint): 

app.get("/tienda", (req, res) => {
    res.send("Bienvenido a la tienda");
})

app.get("/contacto", (req, res) => {
    res.send("Estamos en contacto ahora");
})

//Los métodos HTTP o verbos son los que nos permiten indicarle al servidor que tipo de acción queremos realizar. Los más utilizados: 

//GET: pido datos al servidor. 
//POST: envio info al servidor. 
//PUT: lo uso para actualizar info en el servidor. 
//DELETE: lo uso para borrar datos en el servidor. 



app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})

//5) Objeto Request: es un objeto que representa la petición que realiza el cliente al servidor. 

//Vamos a crear una ruta "productos" que nos retorne un array de productos obviamente MAROLIO. 

const arrayProductos = [
    {id: 1, nombre: "fideos", precio: 150},
    {id: 2, nombre: "arroz", precio: 250},
    {id: 3, nombre: "pan", precio: 350},
    {id: 4, nombre: "leche", precio: 450},
    {id: 5, nombre: "aceite", precio: 550},
]

app.get("/productos", (req, res) => {
    //lo podemos retornar así: 
    res.send(arrayProductos);
})

//req.params: contiene los parametros de la ruta. Por ejemplo si tenemos la ruta /productos/:id, podemos acceder a ese id de la siguiente manera: 

app.get("/productos/:id", (req, res) => {
    let id = req.params.id;
    //Viene como string. 

    //console.log(id, typeof id);

    let producto = arrayProductos.find(producto => producto.id == id); 

    if(producto) {
        res.send(producto);
    } else {
        res.send("Producto no encontrado, vamos a morir!");
    }
})

//req.query: query se refiere a multiples consultas que se pueden hacer en determinada ruta. Simplemente le tenemos que colocar el simbolo de interrogacion ? y luego el nombre de la consulta. 

//Ejemplo voy a crear una ruta para clientes y quiero recuperar 2 datos, el nombre y el apellido del cliente. Usamos los query: 


//Atentos: si queremos trabajar con datos complejos se recomienda usar la linea: 

app.use(express.urlencoded({extended:true}));


app.get("/clientes", (req, res) => {
    let nombre = req.query.nombre;
    let apellido = req.query.apellido;

    res.send(`Bienvenido ${nombre} ${apellido}`);
})