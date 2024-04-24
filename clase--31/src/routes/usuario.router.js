const express = require("express");
const generarUsuarios = require("../utils/util.js");
const router = express.Router(); 

router.get("/mockingproducts", (req, res) => {

    //Generar un array de usuarios: 
    const usuarios = [];

    for(let i = 0; i < 10; i++) {
        usuarios.push(generarUsuarios());
    }
    res.json(usuarios);
})

module.exports = router; 