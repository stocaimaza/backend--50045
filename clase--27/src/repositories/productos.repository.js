const ProductoModel = require("../models/producto.model.js");

class ProductoRepository {
    async traerTodo() {
        try {
            const productos = await ProductoModel.find();
            return productos;
        } catch (error) {
            throw new Error("Error al obtener los juguetes");
        }
    }

    async crear(productoData) {
        try {
            return await ProductoModel.create(productoData)
        } catch (error) {
            throw new Error("Error al crear un juguete");
        }
    }
}

module.exports = ProductoRepository;