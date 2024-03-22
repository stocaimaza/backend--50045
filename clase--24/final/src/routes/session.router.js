import express from "express"; 
const router = express.Router();
import passport from "passport";

//Ruta para registro de usuarios

router.post("/register", passport.authenticate("register"), async (req, res) => {
    if(!req.user) return res.status(401).send({message:"Credenciales invalidas, el decorado se calla"});

    req.session.user = {
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true; 

    res.redirect("/");
})


//Ruta para el login

router.post("/login", passport.authenticate("login"), (req, res) => {
    if(!req.user) return res.status(401).send({message:"Credenciales invalidas, el decorado se calla"});

    req.session.user = {
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true; 

    res.redirect("/");
})

//Ruta para cerrar la sesión

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/");
})

//Ruta para ver el perfil:

router.get("/profile", (req, res) => {
    if(req.session.user) {
        res.render("profile", {user: req.session.user});
    } else {
        res.redirect("/login");
    }
})

export default router;