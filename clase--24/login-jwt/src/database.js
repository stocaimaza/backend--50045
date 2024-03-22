const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/CoderBase?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectados a CoderBase"))
    .catch( (error) => console.log("Si te llega este mensaje tendras lluvia el fin de semana", error))


    