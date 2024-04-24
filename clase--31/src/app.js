//MOCK: es una imitación de un dato real. Es una simulación que generamos en el entorno de desarrollo para no manipular datos reales y para tener herramientas de trabajo en forma rapida. 

//Faker-js: https://fakerjs.dev
//Instalamos: npm install @faker-js/faker
//8.4.1

const express = require("express");
const app = express();
const PUERTO = 8080; 
const usuariosRouter = require("./routes/usuario.router.js");

//Ruta

app.use("/", usuariosRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando en el Puerto de Mar del Plata");
})
