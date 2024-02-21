const mongoose = require("mongoose");

mongoose.connect("conecte su bd")
    .then(() => console.log("Conectado a MongoDB"))
    .catch(error => console.log(error))
