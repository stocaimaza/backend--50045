const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    usuario: String,
    password: String, 
    // rol: {
    //     type: String,
    //     enum: ["admin", "user"], // Enumera los roles permitidos
    //     default: "user" // Asigna por defecto el rol de "user"
    // }
})

const UsuarioModel = mongoose.model("usuarios", usuarioSchema);

module.exports = UsuarioModel;