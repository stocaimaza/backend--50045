const express = require("express");
const router = express.Router();
const UsuarioModel = require("../models/usuarios.model.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Rutas: 

//Register: 
router.post("/register", async (req, res) => {
    const { usuario, password } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existeUsuario = await UsuarioModel.findOne({ usuario });
        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new UsuarioModel({
            usuario,
            password,
            //rol
        });

        await nuevoUsuario.save();

        // Generar el token JWT
        const token = jwt.sign({ usuario: nuevoUsuario.usuario, rol: nuevoUsuario.rol }, "coderhouse", {
            expiresIn: "1h"
        });

        // Establecer el token como cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, // 1 hora de expiración
            httpOnly: true // La cookie solo es accesible mediante HTTP(S)
        });

        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/login", async (req, res) => {
    const { usuario, password } = req.body;
    try {
        // Buscar el usuario en MongoDB
        const usuarioEncontrado = await UsuarioModel.findOne({ usuario });

        // Verificar si el usuario existe
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no válido");
        }

        // Verificar la contraseña
        if (password !== usuarioEncontrado.password) {
            return res.status(401).send("Contraseña incorrecta");
        }

        // Generar el token JWT
        const token = jwt.sign({ usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol }, "coderhouse", {
            expiresIn: "1h"
        });

        // Establecer el token como cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, // 1 hora de expiración
            httpOnly: true // La cookie solo es accesible mediante HTTP(S)
        });

        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get("/home", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.render("home", { usuario: req.user.usuario });
    console.log(req.user);
})

router.post("/logout", (req, res) => {
    // Limpiar la cookie de token
    res.clearCookie("coderCookieToken");
    // Redirigir a la página de login
    res.redirect("/login");
});

//Ruta Admin: 

router.get("/admin", passport.authenticate("jwt", {session:false}), (req, res) => {
    
    if (req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado");
    }
    // Si el usuario es administrador, mostrar el dashboard de administrador
    res.render("admin");
});

//Retorna usuario: Artillery

const {faker} = require("@faker-js/faker");

router.get("/user", (req, res) => {
    const user = {
        usuario: faker.person.firstName(),
        password: faker.internet.password()
    }

    res.send(user);
})

module.exports = router;