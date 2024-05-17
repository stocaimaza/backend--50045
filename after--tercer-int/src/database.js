const mongoose = require("mongoose");

mongoose.connect("tubd")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Vamos a morir, tenemos un error"))
    