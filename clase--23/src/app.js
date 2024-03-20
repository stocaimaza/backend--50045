/** CLASE 23 - RUTEO AVANZADO **/

//Temas de hoy: 

//1) Expresiones Regulares
//2) Restringiendo parámetros
//3) Validar parámetros
//4) Custom Router
//5) Custom Response

//Instalen nodemon y express. 

//////////////////////////////////////////////////////////////////////////////////////

//Expresiones regulares: son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto. 

//Por ejemplo: validar si el texto ingresado por el usuario corresponde a un email: "nombre@dominio.com"

//Ejemplo: 

let correoIngresado = "lionel@messi.com.ar";
let correoFalso = "tinkiwinki";
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//console.log(patronCorreo.test(correoIngresado));
//console.log(patronCorreo.test(correoFalso));


//Ejemplo con un número de telefono: 

//Esperamos este formato: (xxx) xxx-xxxx

const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;
let telefonoIngresado = "(223) 669-1111"
let telefonoMalito = "12345";

//console.log("Verificamos el tel: " + patronTelefono.test(telefonoIngresado));
//console.log("Verificamos el tel: " + patronTelefono.test(telefonoMalito));

//Restringiendo Parámetros: 
//Vemos que pasa cuando queremos trabajar con rutas y esperamos parámetros del usuario. 

//Levantamos un servidor mini con express. 

const express = require("express");
const app = express(); 
const PUERTO = 8080;
const clientesRouter = require("./routes/clientes.router.js");

////////////////////////////////////////////////////////////////
//Nos conectamos con este "nuevo" router: 
const UserRouter = require("./routes/users.router.js");
const userRouter = new UserRouter(); 
app.use("/users", userRouter.getRouter());
////////////////////////////////////////////////////////////////

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas

app.use("/", clientesRouter);

//¿Que hacemos con las rutas que no coinciden con ningun endpoint? 

app.get("*", (req, res) => {
    res.status(404).send({message: "Recurso no encontrado"});
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})


