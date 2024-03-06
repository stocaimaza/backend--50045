const express = require("express");
const router = express.Router();
const UserModel = require("../model/user.model.js"); 

//Login 

router.post("/sessionlogin", async (req, res) => {
    const {email, password} = req.body; 
    try {
        const usuario = await UserModel.findOne({email: email});

        if(usuario) {
            //Aca metemos el login:
            if(usuario.password === password) {
                req.session.login = true; 
                res.status(200).send({message: "Login correcto! Ma jes tuo seishon!"});
            }else {
                res.status(401).send({error: "Contraseña no valida"});
            }
        } else {
            res.status(404).send({error: "Usuario no encontrado"});
        }
    } catch (error) {
        res.status(400).send({error: "Error en el login, vamos a morir"});
    }
})

//Logout

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.status(200).send({message:"Login eliminado"});
})

module.exports = router;