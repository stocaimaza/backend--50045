const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nombre:String,
    categoria: String, 
    precio: Number
})

const JugueteModel = mongoose.model("juguetes", schema);

module.exports = JugueteModel;