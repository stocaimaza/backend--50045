const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");

//PASSPORT CON JWT: 

//Register: 
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existeUsuario = await UserModel.findOne({ email });
        //console.log(existeUsuario);
        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new UserModel({
            first_name,
            last_name, 
            email, 
            password: createHash(password),
            age
        });

        await nuevoUsuario.save();

        // Generar el token JWT
        const token = jwt.sign({ user: nuevoUsuario} , "coderhouse", {
            expiresIn: "1h"
        });

        // Establecer el token como cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, // 1 hora de expiración
            httpOnly: true // La cookie solo es accesible mediante HTTP(S)
        });

        res.redirect("/api/users/profile");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar el usuario en MongoDB
        const usuarioEncontrado = await UserModel.findOne({ email });

        // Verificar si el usuario existe
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no válido");
        }

        // Verificar la contraseña
        const esValido = isValidPassword(password, usuarioEncontrado);
        if (!esValido) {
            return res.status(401).send("Contraseña incorrecta");
        }

        // Generar el token JWT
        const token = jwt.sign( {user: usuarioEncontrado}, "coderhouse", {
            expiresIn: "1h"
        });

        // Establecer el token como cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, // 1 hora de expiración
            httpOnly: true // La cookie solo es accesible mediante HTTP(S)
        });

        res.redirect("/api/users/profile");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get("/profile", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.render("profile", req.user);
    console.log(req.user);
    console.log("Usuario en la ruta de perfil:", req.user);
})

router.post("/logout", (req, res) => {
    // Limpiar la cookie de token
    res.clearCookie("coderCookieToken");
    // Redirigir a la página de login
    res.redirect("/login");
});

//Ruta Admin: 

router.get("/admin", passport.authenticate("jwt", {session:false}), (req, res) => {
    if (req.user.user.role !== "admin") {
        return res.status(403).send("Acceso denegado");
    }
    // Si el usuario es administrador, mostrar el dashboard de administrador
    res.render("admin");
});




module.exports = router;

