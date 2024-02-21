const express = require("express");
const router = express.Router(); 
const ImagenModel = require("../models/imagen.js");
const fs = require("fs").promises;

//Ruta raiz de la aplicacion

router.get("/", async (req, res) => {
    const imagenes = await ImagenModel.find(); 

    const nuevoArrayImagenes = imagenes.map(imagen => {
        return {
            id: imagen._id,
            title: imagen.title,
            description: imagen.description,
            filename: imagen.filename,
            path: imagen.path
        }
    })

    res.render("index", {imagenes: nuevoArrayImagenes});
    
})

//Ruta para acceder al formulario de carga de imagenes. 

router.get("/upload", (req, res) => {
    res.render("upload");
})


//Ruta upload, para subir imagenes con multer. 

router.post("/upload", async (req, res) => {
    try {
        const imagen = new ImagenModel(); 
        imagen.title = req.body.title;
        imagen.description = req.body.description;
        imagen.filename = req.file.filename;
        imagen.path = "/img/" + req.file.filename;

        //Guardamos imagenes en la base de datos
        await imagen.save();

        res.redirect("/");
    } catch (error) {
        res.status(500);
    }
})

//Ruta para eliminar una imagen 

router.get("/image/:id/delete", async (req, res) => {
    const {id} = req.params;
    const imagen = await ImagenModel.findByIdAndDelete(id);
    await fs.unlink("./src/public" + imagen.path);
    res.redirect("/");
})

module.exports = router; 