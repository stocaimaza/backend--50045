const express = require("express");
const router = express.Router(); 

router.get("/", (req, res) => {
    res.render("index");
});

/*Ejercicio guia para el punto n°1 de desafio */

// router.get("/", async(req, res) => {
//     try {
//         const productos = await productManger.getProducts(); 
//         res.render("home", {productos})
//     } catch (error) {
        
//     }
// })



module.exports = router; 

