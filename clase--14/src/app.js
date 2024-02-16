/** CLASE 14 - MONGOOSE **/

//Temas de hoy: 

//1) Clientes de base de datos. 
//2) MongoDB Atlas
//3) DBaas ( Database as a service )
//4) Configuración e instalación de Mongoose
//5) CRUD en nuestra app. 

/////////////////////////////////

//Instalamos mongoose: npm install mongoose

//Preparamos nuestro servidor con Express: 

//////////////////////////////////////////////

const express = require("express");
const app = express(); 
const PUERTO = 8080; 
//Me conecto a mongoose: 
const mongoose = require("mongoose");
//Importo el router de clientes: 
const clientesRouter = require("./routes/clientes.router.js");

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Ruta
app.use("/clientes", clientesRouter);

//Listen
app.listen(PUERTO, () => {
    console.log(`Estamos conectados en el puerto ${PUERTO}`);
})

//Nos conectamos a MongoDB Atlas: 

mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/Tienda?retryWrites=true&w=majority")
    .then(() => console.log("Conectados a la BD"))
    .catch((error) => console.log(error))

