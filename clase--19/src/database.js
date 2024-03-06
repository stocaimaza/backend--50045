const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa!"))
    .catch( () => console.log("Vamos a morir, siguen los errores"))