const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    categoria: String
});

const ProductoModel = mongoose.model("productos", productoSchema);

module.exports = ProductoModel; 