import mongoose from "mongoose";

mongoose.connect("")
    .then( () => console.log("Conectado a MongoDB"))
    .catch( (error) => console.log("Tenemos un error, vamos a morir, todo es bronca y dolor", error))