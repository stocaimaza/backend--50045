const express = require("express");
const router = express.Router();
const ProductoModel = require("../models/productos.model.js");

// Ruta para obtener todos los productos o filtrar por categoría
router.get('/', async (req, res) => {
    const { categoria } = req.query; // Extraer el parámetro de consulta "categoria"
    try {
        let productos;
        if (categoria) {
            // Filtrar productos por categoría si el parámetro "categoria" está presente
            productos = await ProductoModel.find({ categoria });
        } else {
            // Obtener todos los productos si no hay categoría en la consulta
            productos = await ProductoModel.find();
        }
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener detalles de un producto específico por su ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await ProductoModel.findById(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
