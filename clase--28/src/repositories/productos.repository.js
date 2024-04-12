// const FileSystemDAO = require("../dao/filesystem.dao.js");
// const MemoryJuguetesDAO = require("../dao/memory.dao.js");
// const MongoDBJugueteDAO = require("../dao/mongo.dao.js");



const DAOFactory = require("../dao/factory.js");
const productoService = new DAOFactory();
const JugueteDTO = require("../dto/juguete.dto.js");

class ProductoRepository {
    async traerTodo() {
        try {
            const juguetes = await productoService.obtenerJuguetes();
            return juguetes; 
        } catch (error) {
            throw new Error("Error al obtener los juguetes");
        }
    }

    async crear(productoData) {
        try {
            const productoDTO = new JugueteDTO(productoData);
            //console.log(productoDTO);
            const juguete = await productoService.crearJuguete(productoDTO);
            return juguete; 
        } catch (error) {
            throw new Error("Error al crear un juguete");
        }
    }
}

module.exports = ProductoRepository;