/** CLASE 25 - PROCESO PRINCIPAL DEL SERVIDOR + CHILD PROCESS **/

//Temas de hoy: 

//1) Objeto Process. 
//2) Manejo de Argumentos. 
//3) Commander JS. 
//4) Manejo de variables de entorno. 
//5) Listeners
//6) Child Process
//7) Descansamos 6 dias jaja!!

//Objeto Process:  cada vez que yo ejecuto en la consola: node src/app.js se crea automáticamente un objeto llamado "process", que contiene información sobre el proceso. Es decir, la lectura del módulo y la ejecución del código escrito. 

console.log("Bienvenidos Comision 50045!");

//console.log(process);
//Como pueden ver es un objeto muy amplio con toda la información del proceso. 

//Algunos elementos importantes: 

console.log(process.cwd());
//Directorio actual del proceso. 

console.log(process.pid);
//Obtengo el ID del proceso en el sistema operativo. 

console.log(process.memoryUsage());
//Uso de memoria del proceso, los valores estan en bytes. 

console.log(process.version);
//Me va a retornar la version de Node JS. 

//process.exit()
//Permite salir del proceso. 

//console.log("Y este texto? Se muestra?");

//2) Manejo de Argumentos en la consola: 

//process.argv: muestra los argumentos pasados en la CLI
console.log("Argumentos que yo paso en la consola: ");
console.log(process.argv);

//Ejemplo de cuando usamos argumentos: npm i nodemon -D

//Instalamos Commander JS: 
//npm i commander


//Generamos un pequeño servidor y nos conectamos con MongoDB

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/usuarios.model.js");
const configObject = require("./config/config.js");

const { mongo_url, puerto } = configObject;
console.log(configObject);

//Nos conectamos con la BD: 

mongoose.connect(mongo_url)
    .then(() => console.log("Conexión exitosa!"))
    .catch((error) => console.log("Si te aparece esto vas a tener dengue el fin de semana largo", error))



//Ruta

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


//Listen

app.listen(puerto, () => {
    console.log(`Escuchando en el PUERTO: `, puerto);
})


//Listeners: 

//Los eventos me permiten escuchar todo lo que hace el usuario en el navegador, en Node tambien podemos escuchar eventos que ocurren durante el proceso de ejecución de la aplicación y responder de diferentes maneras. 

//El método que nos permite escuchar los eventos es: process.on()

//Algunos eventos más utilizados: 

// process.on("exit", () => {
//     console.log("Este código se ejecutará justo antes de terminar el proceso");
// })


console.log("Y esto cuando se muestra?");

//Vamos a atrapar alguna excepcion. 

process.on("uncaughtException", (error) => {
    console.log("Tenemos un error mortal", error)
    process.exitCode = 1;
});

//Esta linea me sirve a mi para registrar un error, pero no reemplaza al try catch. Si tenemos un error la aplicación se detiene. 


// process.on("exit", (code) => {
//     console.log("Terminamos el proceso co el siguiente código: ", code);
// })


//firulais(); 

//6) Child Process 

// function operacionCompleja() {
//     let resultado = 0;

//     for (let i = 0; i < 5e9; i++) {
//         resultado += i;
//     }

//     return resultado;
// }

// app.get("/suma", (req, res) => {
//     const resultado = operacionCompleja();
//     res.send(`El resultado de la operación es: ${resultado}`);
// })

//Tenemos que lograr que el proceso de suma se realice sin bloquear el resto de los endpoints. 

//Comenzamos a estructurar el forkeo. 
//1) Separamos la función que trae problemas a otro módulo. 
//2) La modificamos y la dejamos disponible para cuando el padre la solicite. 
//3) Ejecutamos la ruta: 

const {fork} = require("child_process");

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionCompleja.js");
    child.send("iniciando"); //Enviamos un mensaje al hijo. 
    child.on("message", resultado => {
        res.send(`El resultado de la operación es: ${resultado}`);
    })
})
