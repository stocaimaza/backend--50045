const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nombre: String,
    apellido: String, 
    legajo: Number
})

const UserModel = mongoose.model("usuarios", schema);

module.exports = UserModel;