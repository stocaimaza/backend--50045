/** CLASE 34 - LOGGERS Y TESTING DE PERFORMANCE **/

//WINSTON

//Los transportes pueden enviar información a: consola, base de datos y archivos. 

//Nivel: Sistema de prioridad que tiene cada log, para definir si lo enviamos a un archivo de texto o solo lo mostramos por consola. 

//Los niveles que ya vienen configurados con winston son los siguientes: 

{
    error: 0;
    warn: 1;
    info: 2;
    http: 3;
    verbose: 4;
    debug: 5;
    silly: 6
}
//Siendo el 0 el mas importante. 

//Lo voy a instalar con el siguiente comando: npm i winston 

const express = require("express");
const app = express(); 
const PUERTO = 8080;
//Importamos el middleware: 
const addLogger = require("./utils/logger.js");

//Middleware
app.use(addLogger);

//Ruta

app.get("/saludito", (req, res) => {
    res.send("Olis!");
})

//Test

app.get("/loggerTest", (req, res) => {
    req.logger.error("Vamos a morir"); 
    req.logger.warning("Cuidado! Hombre radiactivo!"); 
    req.logger.info("Estamos navegando la app");

    res.send("Logs generados!");
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

//Artillery: es una herramienta que me permite simular múltiples peticiones de información en mi servidor, con la idea de testear el funcionamiento. 

//Lo instalamos de manera global: npm install -g artillery

//Simulamos algunas operaciones para testear con Artillery: 

app.get("/operacionsimple", (req, res) => {
    let suma = 0; 
    for ( let i = 0; i < 1000000; i++ ) {
        suma += i; 
    }

    res.send({suma});
})

//Operacion compleja: 

app.get("/operacioncompleja", (req, res) => {
    let suma = 0; 
    for ( let i = 0; i < 5e8 ; i++ ) {
        suma += i; 
    }

    res.send({suma});
})

//Operacion simple: 
//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//Operacion Compleja: 
//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json