const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50015:coderhouse@cluster0.gbtlnu1.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Vamos a morir, tenemos un error"))
    