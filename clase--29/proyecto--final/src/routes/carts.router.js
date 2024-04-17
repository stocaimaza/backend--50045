const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller.js");
const cartController = new CartController(); 

router.post("/", cartController.nuevoCarrito);
router.get("/:cid", cartController.obtenerProductosDeCarrito);
router.post("/:cid/product/:pid", cartController.agregarProductoEnCarrito);
router.delete('/:cid/product/:pid', cartController.eliminarProductoDeCarrito);
router.put('/:cid', cartController.actualizarProductosEnCarrito);
router.put('/:cid/product/:pid', cartController.actualizarCantidades);
router.delete('/:cid', cartController.vaciarCarrito);

module.exports = router;
