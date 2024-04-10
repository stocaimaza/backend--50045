const express = require("express");
const router = express.Router(); 
const ProductoController = require("../controllers/producto.controller.js");
const productoController = new ProductoController(); 

router.get("/", productoController.getProductos);
router.post("/", productoController.postProductos);

module.exports = router;