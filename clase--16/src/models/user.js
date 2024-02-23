const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //Si yo quiero agregar un indice, lo unico que tengo que hacer: 
    nombre: {
        type: String,
        //index: true
    },

    apellido: String, 

    email: {
        type: String,
        unique: true,
        required: true
    }, 

    edad: {
        type: Number,
        //index: true
    }
})

const UserModel = mongoose.model("usuarios", userSchema);

module.exports = UserModel;