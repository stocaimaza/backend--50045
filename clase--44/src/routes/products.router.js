const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller.js");
const productController = new ProductController(); 
const passport = require("passport");

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", passport.authenticate("jwt", { session: false }) ,productController.addProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

module.exports = router;