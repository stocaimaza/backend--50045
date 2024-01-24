const express = require("express");
const router = express.Router(); 

//Array para almacenar usuarios. 
const users = []; 

//Rutas usuarios: 

router.get("/", (req, res) => {
    res.json(users);
})

router.post("/", (req, res) => {
    const nuevoUsuario = req.body; 
    users.push(nuevoUsuario); 
    res.send({status:"success", message: "Usuario creado correctamente"})
})

module.exports = router; 