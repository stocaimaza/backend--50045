/** CLASE 22 - PASSPORT AVANZADO **/

//JsonWebToken es una implementación sin estado que me permite mantener el cliclo de vida de la sesión del usuario. 

//¿Cómo funciona? 

//1) El servidor genera un token y se lo envia al cliente (navegador). 
//2) El navegador almacena ese token y en cada petición al servidor se lo presenta por medi de los headers. 
//3) El servidor recibe las peticiones, busca el token de JWT en los headers, si lo encuentra podra proceder, sino pide autenticación. 

const express = require("express");
const app = express();
const PUERTO = 8080; 
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const {passportCall, authorization} = require("./utils/util.js");

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//Rutas
app.post("/login", (req, res) => {
    let {usuario, pass} = req.body;

    if(usuario === "tinki" && pass === "winki") {
        //let token = jwt.sign({usuario, pass}, "coderhouse", {expiresIn: "24h"});
        //res.send({message: "Login exitoso", token});

        //Enviar desde una cookie.
        //res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({message: "login exitoso!"});

        //////////////////////////////////////////////////////////////////////
        //Modificación para utilizar el middleware "authorization": 
        let token = jwt.sign({usuario, pass, role: "admin"}, "coderhouse", {expiresIn:"24h"});
        res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({message: "login exitoso!"});

        //////////////////////////////////////////////////////////////////////


        //60*60*1000 = representa una hora en milisegundos. 
        //La opción httpOnly es una medida de seguridad qeu indica que la cookie solo se puede acceder a traves del protocolo HTTP y no mediante JS en el navegador. 
    } else {
        res.send({message: "Login Fallido"});
    }
})

//Creamos la ruta current: 

// app.get("/current", passport.authenticate("jwt", {session:false}), (req, res) => {
//     res.send(req.user);
// })

//Usamos PassportCall

app.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
    res.send(req.user);
})


//Iniciamos el servidor

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})