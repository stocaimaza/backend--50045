const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    precio: Number,
    fullname: {
        type: String,
        required: true
    }
})

const ProductoModel = mongoose.model("juguetes", productoSchema);

module.exports = ProductoModel;