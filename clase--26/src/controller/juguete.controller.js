const JugueteService = require("../services/juguetes.services.js");
const jugueteService = new JugueteService(); 

class JugueteController {
    async crearJuguete(req, res) {
        try {
            const juguete = await jugueteService.crearJuguete(req.body);
            res.json(juguete);
        } catch (error) {
            res.status(500).json({error: "No se puede crear el juguete"});
        }
    }

    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
            res.json(juguetes);
        } catch (error) {
            res.status(500).json({error: "No se pueden obtener los juguetes"});
        }
    }
}

module.exports = JugueteController;
