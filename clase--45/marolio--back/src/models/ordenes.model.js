const mongoose = require("mongoose");

const ordenSchema = new mongoose.Schema({
    items: [{
        producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: Number
    }],
    total: Number,
    fecha: { type: Date, default: Date.now },
    nombre: String,
    apellido: String,
    telefono: String,
    email: String
});

const OrdenModel = mongoose.model("ordenes", ordenSchema);

module.exports = OrdenModel; 