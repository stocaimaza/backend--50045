//Login con Facebook
//instalar dependencias: npm i express passport passport-facebook express-session express-handlebars mongoose

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const exphbs = require("express-handlebars"); 
const initilizePassport = require("./config/passport.config.js");
const app = express();
const PUERTO =  8080;
require("./database.js");

//Express Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 

//Configuramos la session

app.use(session({
    secret:"tu_secreto",
    resave: false,
    saveUninitialized: false
})); 

//Configuramos passport: 
app.use(passport.initialize());
app.use(passport.session());
initilizePassport();

//Rutas 

app.get("/login", (req, res) => {
    res.render("login");
})

//Ruta de inicio de sesion con facebook
app.get("/auth/facebook", passport.authenticate("facebook"));

//Ruta de callback
app.get("/auth/facebook/callback", passport.authenticate("facebook", {successRedirect: "/inicio", failureRedirect:"/login"}));

//Ruta protegida que requiere el login

app.get("/inicio", (req, res) => {
    if(req.isAuthenticated()) {
        let {displayName, provider} = req.user;
        res.render("inicio", {displayName, provider});
    } else {
        res.redirect("/login");
    }
})

//Cerramos la sesion

app.get("/logout", (req, res) => {
    req.logout( (error) => {
        if(error) {
            console.log(error);
            return res.redirect("/");
        }
        return res.redirect("/login");
    })
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})