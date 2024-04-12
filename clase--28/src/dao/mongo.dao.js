const ProductoModel = require("../models/producto.model.js");

class MongoDBJugueteDAO {
    async crearJuguete(datosJuguete){
        try {
            const juguete = new ProductoModel(datosJuguete);
            return await juguete.save();
        } catch (error) {
            throw new Error("Error al crear el juguete en MongoDB");
        }
    }

    async obtenerJuguetes() {
        try {
            return await ProductoModel.find();
        } catch (error) {
            throw new Error("Error al obtener los juguetes en MongoDB");
        }
    }

}

module.exports = MongoDBJugueteDAO;