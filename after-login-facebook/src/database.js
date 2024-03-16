const mongoose = require("mongoose");

mongoose.connect("tubd")
    .then(() => console.log("Conexion Exitosa"))
    .catch(() => console.log("Fallo todo vamos a morir"))