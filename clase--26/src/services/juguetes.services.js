const JugueteModel = require("../models/juguete.model.js");

class JugueteService {
    async crearJuguete(datosJuguete) {
        try {
           const juguete = new JugueteModel(datosJuguete) ;
           return await juguete.save();
        } catch (error) {
            throw new Error("Error al crear el juguete");
        }
    }

    async obtenerJuguetes() {
        try {
            return await JugueteModel.find();
        } catch (error) {
            throw new Error("Error al obtener el listado de juguetes");
        }
    }
}

module.exports = JugueteService;