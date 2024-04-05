const express = require("express");
const router = express.Router(); 

//Aca me tengo que traer el controlador. 
const JugueteController = require("../controller/juguete.controller.js");
const jugueteController = new JugueteController();

//En las rutas voy a conectar el endpoint con el método del controlador correspondiente:

router.post("/", jugueteController.crearJuguete);
router.get("/", jugueteController.obtenerJuguetes);

module.exports = router; 
