const ProductoRepository = require("../repositories/productos.repository.js");
const productoRepository = new ProductoRepository(); 

class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await productoRepository.traerTodo();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }

    async postProductos(req, res) {
        const nuevoProducto = req.body;
        try {
            await productoRepository.crear(nuevoProducto);
            res.status(200).send("producto creado");
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }
}

module.exports = ProductoController;