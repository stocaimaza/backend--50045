const express = require("express");
const router = express.Router(); 

//Importamos el modelo: 
const ClientesModel = require("../models/clientes.model.js");

//1) Obtenemos el listado de todos los clientes: 

router.get("/", async (req, res) => {
    try {
        const clientes = await ClientesModel.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({message: "Error en el servidor, vamos a morir ahhhhhhh"});
    }
})

//2) Subimos un nuevo cliente por Postman:

router.post("/", async (req, res) => {
    try {
        const cliente = new ClientesModel(req.body);
        await cliente.save(); 
        res.send({message:"Cliente cargado exitosamente", cliente: cliente})
    } catch (error) {
        res.status(500).json({message: "Error en el servidor, vamos a morir ahhhhhhh"});
    }
})


//3) Actualizamos un cliente por su id: 

router.put("/:id", async (req, res) => {
    try {
        const cliente = await ClientesModel.findByIdAndUpdate(req.params.id, req.body); 
        res.status(200).send({message:"Todo bien!!! ya te lo actualizamos"});
        if(!cliente) {
            return res.status(404).send({message: "Cliente no encontrado"});
        }
    } catch (error) {
        res.status(500).json({message: "Error en el servidor, vamos a morir ahhhhhhh"});
    }
})


//4) Eliminamos un cliente por su ID

router.delete("/:id", async (req, res) => {
    try {
        const cliente = await ClientesModel.findByIdAndDelete(req.params.id); 
        res.status(200).send({message:"Borrado"});
        if(!cliente) {
            return res.status(404).send({message: "Cliente no encontrado"});
        }
    } catch (error) {
        res.status(500).json({message: "Error en el servidor, vamos a morir ahhhhhhh"});
    }
})


module.exports = router; 