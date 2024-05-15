const UserModel = require("../models/user.model.js");
const CartModel = require("../models/cart.model.js");
const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");
const UserDTO = require("../dto/user.dto.js");
const { generarResetToken } = require("../utils/tokenreset.js");

//Tercer integradora:
const EmailManager = require("../services/email.js");
const emailManager = new EmailManager();

class UserController {
    async register(req, res) {
        const { first_name, last_name, email, password, age } = req.body;
        try {
            const existeUsuario = await UserModel.findOne({ email });
            if (existeUsuario) {
                return res.status(400).send("El usuario ya existe");
            }

            //Creo un nuevo carrito: 
            const nuevoCarrito = new CartModel();
            await nuevoCarrito.save();

            const nuevoUsuario = new UserModel({
                first_name,
                last_name,
                email,
                cart: nuevoCarrito._id,
                password: createHash(password),
                age
            });

            await nuevoUsuario.save();

            const token = jwt.sign({ user: nuevoUsuario }, "coderhouse", {
                expiresIn: "1h"
            });

            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true
            });

            res.redirect("/api/users/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const usuarioEncontrado = await UserModel.findOne({ email });

            if (!usuarioEncontrado) {
                return res.status(401).send("Usuario no válido");
            }

            const esValido = isValidPassword(password, usuarioEncontrado);
            if (!esValido) {
                return res.status(401).send("Contraseña incorrecta");
            }

            const token = jwt.sign({ user: usuarioEncontrado }, "coderhouse", {
                expiresIn: "1h"
            });

            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true
            });

            res.redirect("/api/users/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async profile(req, res) {
        //Con DTO: 
        const userDto = new UserDTO(req.user.first_name, req.user.last_name, req.user.role);
        const isAdmin = req.user.role === 'admin';
        res.render("profile", { user: userDto, isAdmin });
    }

    async logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    }

    async admin(req, res) {
        if (req.user.user.role !== "admin") {
            return res.status(403).send("Acceso denegado");
        }
        res.render("admin");
    }

    //Tercer Integradora: 

    async requestPasswordReset(req, res) {
        const { email } = req.body;
        try {
            //Buscar el usuario por su correo electrónico.
            const user = await UserModel.findOne({ email });

            if (!user) {
                //Si no hay usuario tiro error y el metodo termina aca. 
                return res.status(404).send("Usuario no encontrado");
            }

            //Si hay usuario, genero un token:

            const token = generarResetToken();
            //Esta funcion la tengo en mi carpetita utils. 

            //Una vez que tenemos el token, lo podemos guardar en el usuario. 

            user.resetToken = {
                token: token,
                expire: new Date(Date.now() + 3600000) // 1 Hora de duración. 
            }
            await user.save()

            //Enviar un correo electrónico con el enlace para restablecer:
            await emailManager.enviarCorreoRestablecimiento(email, user.first_name, token);

            res.redirect("/confirmacion-envio");
        } catch (error) {
            res.status(500).send("Error interno del servidor");
        }
    }

    async resetPassword(req, res) {
        const { email, password, token } = req.body;

        try {
            //Busco al usuario:
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.render("passwordcambio", { error: "Usuario no encontrado" });
            }

            //Saco el token y lo verificamos
            const resetToken = user.resetToken;
            if (!resetToken || resetToken.token !== token) {
                return res.render("passwordreset", { error: "El token de restablecimiento de contraseña es invalido" });
            }

            //Verificamos si el token expiro: 
            const ahora = new Date();
            if (ahora > resetToken.expire) {
                return res.render("passwordreset", { error: "El token de restablecimiento de contraseña es invalido" });
            }

            //Verificamos si la contraseña nueva es igual a la anterior: 
            if (isValidPassword(password, user)) {
                return res.render("passwordcambio", { error: "La nueva contraseña no puede ser igual a la anterior" });
            }

            //Actualizo la contraseña del usuario: 
            user.password = createHash(password);

            //Marcamos como usado a ese token. 
            user.resetToken = undefined;
            await user.save();

            return res.redirect("/login");

        } catch (error) {
            return res.status(500).render("passwordreset", { error: "Error interno del servidor" });
        }
    }

    async cambiarRolPremium(req, res) {
        const { uid } = req.params;
        try {
            //Busco el usuario: 
            const user = await UserModel.findById(uid);

            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }

            const nuevoRol = user.role === "usuario" ? "premium" : "usuario";

            const actualizado = await UserModel.findByIdAndUpdate(uid, { role: nuevoRol });
            res.json(actualizado);
        } catch (error) {
            res.status(500).send("Error del servidor vamos a re morir");
        }
    }
}

module.exports = UserController;
