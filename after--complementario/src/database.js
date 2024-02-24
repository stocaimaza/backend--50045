//Acá hacemos la conexión con MONGODB: 

//1) Instalamos mongoose: npm i mongoose. 
const mongoose = require("mongoose");

//2) Crear una conexión con la base de datos

mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa"))
    .catch(() => console.log("Error en la conexion"))

