const express = require("express");
const router = express.Router();
const UsuarioModel = require("../models/usuarios.model.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Register: 

router.post("/register", async (req, res) => {
    const {usuario, password} = req.body; 
    try {
        //1) Verificamos si el usuario existe en nuestra BD. 
        const existeUsuario = await UsuarioModel.findOne({usuario});

        if(existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }

        //2) Creamos un nuevo usuario: 
        const nuevoUsuario = new UsuarioModel({
            usuario,
            password,
        });

        //3) Lo guardamos en la BD. 
        await nuevoUsuario.save();

        //4) Generamos el Token de JWT. 
        const token = jwt.sign({usuario}, "coderhouse", {expiresIn:"1h"});

        //5) Mandamos como cookie el token: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 hora de expiración
            httpOnly: true //La cookie solo se puede acceder mediante HTTP. 
        });

        //6) Lo mandamos al Home: 
        res.redirect("/home");

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})


router.post("/login", async (req, res) => {
    const {usuario, password} = req.body; 
    try {
        //1) Busco el usuario en MongoDB
        const usuarioEncontrado = await UsuarioModel.findOne({usuario});

        if(!usuarioEncontrado) {
            return res.status(401).send("Usuario no valido");
        }

        //2) Verificamos la contraseña: 
        if(password !== usuarioEncontrado.password) {
            return res.status(401).send("Contraseña incorrecta");
        }

        //3) Generamos el Token de JWT. 
        const token = jwt.sign({usuario: usuarioEncontrado.usuario, rol:usuarioEncontrado.rol}, "coderhouse", {expiresIn:"1h"});

        //4) Mandamos como cookie el token: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 hora de expiración
            httpOnly: true //La cookie solo se puede acceder mediante HTTP. 
        });

        res.redirect("/home");
    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})

//Home: 

router.get("/home", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario});
})


//Logout: 

router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
    //Limpiamos la cookie y lo mandamos al login. 
})

//Ruta admin:

router.get("/admin", passport.authenticate("jwt", {session:false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado");
    }

    //Y si sos admin podes pasar al tablero de admin. 
    res.render("admin");
})


module.exports = router;