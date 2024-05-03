const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/Artillery?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectado a la BD"))
    .catch( (error) => console.log(error))