const express = require("express"); 
const router = express.Router();

//Array para almacenar mascotas. 
const pets = [];

//Rutas mascotas: 

router.get("/", (req, res) => {
    res.json(pets);
})

router.post("/", (req, res) => {
    const nuevaMascota = req.body; 
    pets.push(nuevaMascota);
    res.send({status:"success", message: "Mascota creada correctamente"})
})

module.exports = router; 
