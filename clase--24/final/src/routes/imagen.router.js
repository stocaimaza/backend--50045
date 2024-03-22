import { Router } from "express";
import ImagenModel from "../models/imagen.js";
import {promises as fs} from "fs";
const router = Router();

//Ruta raíz de la aplicación

router.get("/", async (req, res) => {
    const imagenes = await ImagenModel.find();

    const nuevoArrayImagenes = imagenes.map( imagen => {
        return {
            id: imagen._id,
            title: imagen.title,
            description: imagen.description,
            filename: imagen.filename,
            path: imagen.path
        }
    })

    res.render("index", {imagenes: nuevoArrayImagenes, user: req.session.user});
})


//Ruta para acceder al formulario de carga

router.get("/upload", (req, res) => {
    res.render("upload");
})


//Ruta upload, para subir imagenes con multer

router.post("/upload", async (req, res) => {
    try {
        const imagen = new ImagenModel();
        imagen.title = req.body.title;
        imagen.description = req.body.description;
        imagen.filename = req.file.filename;
        imagen.path = "/img/" + req.file.filename;

        //Guardamos el objeto en la base de datos
        await imagen.save();

        res.redirect("/");
    } catch (error) {
        res.status(500).send({message: "Error del server, vamos a morir"});
    }
})

//Ruta para eliminar una imagen 

const requireAuth = (req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

router.get("/image/:id/delete", requireAuth, async (req, res) => {
    const {id} = req.params;
    const imagen = await ImagenModel.findByIdAndDelete(id);
    await fs.unlink("./src/public" + imagen.path);
    res.redirect("/");
})

export default router;