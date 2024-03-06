const express = require("express");
const router = express.Router();
const UserModel = require("../model/user.model.js");

//Post para generar un usuario y almacenarlo en MongoDB

router.post("/", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body;

    try {
        await UserModel.create({first_name, last_name, email, password, age})
        
        res.status(200).send({message: "Usuario creado con exito siiiiiiii!!!"});
    } catch (error) {
        res.status(400).send({error:"Error al crear el usuario"});
    }
})

module.exports = router; 