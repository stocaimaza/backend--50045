const express = require("express");
const { generarInfoError } = require("../services/errors/info.js");
const { EErrors } = require("../services/errors/enums.js");
const CustomError = require("../services/errors/custom-error.js");
const router = express.Router(); 

//Array de usuarios: 
const arrayUsuarios = [];

router.post("/", async (req, res, next) => {
    const {nombre, apellido, email} = req.body; 
    try {
        if(!nombre || !apellido || !email) {
            throw CustomError.crearError({
                nombre: "Usuario Nuevo", 
                causa: generarInfoError({nombre, apellido, email}),
                mensaje: "Error al intentar crear un usuario",
                codigo: EErrors.TIPO_INVALIDO
            })
        };

        const usuario = {
            nombre,
            apellido, 
            email
        }

        arrayUsuarios.push(usuario);
        console.log(arrayUsuarios);
        res.send({status: "success", payload: usuario});
    } catch (error) {
        next(error);
    }
})

module.exports = router; 
