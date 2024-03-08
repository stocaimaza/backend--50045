const express = require("express");
const router = express.Router();

// Ruta para el formulario de login
router.get("/login", (req, res) => {
    if (req.session.login) {
        return res.redirect("/profile");
    }
    res.render("login");
});

// Ruta para el formulario de registro
router.get("/register", (req, res) => {
    if (req.session.login) {
        return res.redirect("/profile");
    }
    res.render("register");
});

// Ruta para la vista de perfil
router.get("/profile", (req, res) => {
    if (!req.session.login) {
        return res.redirect("/login");
    }
    res.render("profile", { user: req.session.user });
});

module.exports = router;