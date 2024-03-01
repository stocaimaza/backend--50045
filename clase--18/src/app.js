// Clase 18 -  Cookies y Sessions

//1) Cookies: 

//Son pequeños archivos de texto que viven en el navegador del usuario. 
//Esta información puede viajar entre las peticiones del cliente y las respuestas del servidor. 

//Algunos datos que pueden guardar: 

//ID de sesiones
//Preferencias del usuario (modo claro, idioma)
//Nombre de usuario

//Para trabajar con las cookies instalamos una nueva dependencia: cookie-parser

//2) Sesiones: 
//Con las sesiones podemos mantener información sobre el cliente.

//Caracteristicas: 

//A) La información que se quiere guardar se almacena del lado del servidor. 
//B) Del lado del cliente se crea un identificador único para poder acceder a esa información. 
//C) Los datos almacenados en sesssion se borral al cerrar el navegador. 
//D) Se utiliza generalmente para guardar datos de usuario al iniciar una sesión. 

//instalamos: npm i express-session
//Importamos el modulo
//Configuramos el middleware

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(cookieParser());
//Se suma uno nuevo!!:

//Firmamos cookies: 
const miAltaClaveSecreta = "TinkiWinki";
app.use(cookieParser(miAltaClaveSecreta));

//Middleware de Session
app.use(session({
    secret: "secretCoder",
    resave: true, 
    //Resave me permite mantener activa la sesion frente a la inactividad del usuario. 
    saveUninitialized: true
    //Permite guardar cualquier sesión aún cuando el objeto de sesión no tenga nada para contener. 
}))

//Middleware de autenticación: 

function auth(req, res, next) {
    if(req.session.user === "tinki" && req.session.admin == true) {
        return next();
    }
    return res.status(401).send("Error de autorizacion");
}

//Rutas 

app.get("/", (req, res) => {
    res.send("Hola mundo");
})

//Seteamos una cookie: 

app.get("/setcookie", (req, res) => {
    //Usaremos el objeto "res" para asignarle una cookie al cliente. 
    //res.cookie("coderCookie", "Mi primera chamba con cookie").send("Cookie seteada!");
    //Las almacenamos en formato "clave-valor". 
    //Esta cookie vive hasta que es eliminada. Si yo quiero que tenga un tiempo de vida limitado puedo hacer lo siguiente: 

    res.cookie("coderCookie", "Mi primera chamba con cookie", {maxAge:3000000}).send("Cookie seteada con vida limitada");
})

//Leemos el valor de una cookie: 

app.get("/leercookie", (req, res) => {
    //res.send(req.cookies.coderCookie);
    //Si quiero leer una cookie especifica le paso la propiedad. 

    res.send(req.cookies);
})

//Borramos una cookie: 

app.get("/borrarcuki", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie eliminada");
})

//Enviamos una cookie firmada: 

app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esto es un mensaje secreto", {signed: true}).send("Cookie firmada enviada!");
})

//Obtenemos una cookie firmada: 

app.get("/recuperamoscookiefirmada", (req, res) => {
    //Ahora para recuperar la cookie firmada tengo que utilizar: req.signedCookies: 
    const valorCookie = req.signedCookies.cookieFirmada;

    if(valorCookie) {
        res.send("Cookie recuperada: " + valorCookie);
    } else {
        res.send("Cookie invalida"); 
    }

})

//Levantamos la session en el endpoint: 
app.get("/session", (req, res) => {
    //Si al conectarme la session ya existe aumento el contador. 
    if(req.session.counter) {
        req.session.counter++;
        res.send("Se visitó el sitio: " + req.session.counter + " veces");
    } else {
        req.session.counter = 1; 
        res.send("Bienvenido!!!");
    }

})

//Eliminamos datos de la session: 

app.get("/logout", (req, res) => {
    //Para eliminar datos de una variable de session, se utiliza el parámetro de request y el método destroy. Pasamos tambien un callback: 

    req.session.destroy( (error) => {
        if(!error) {
            res.send("Sesion cerrada!");
        } else  {
            res.send({status:"error al logout", body: error});
        }
    }) 
})

//Login con Session: 

app.get("/login", (req, res) => {
    let {usuario, pass} = req.query;

    if(usuario === "tinki" && pass === "winki") {
        req.session.user = usuario; 
        req.session.admin = true; 
        res.send("Inicio de sesión exitoso!");
    } else {
        res.send("Datos incorrectos, moriras rata de dos patas!");
    }
})

//Ruta privada con Login

app.get("/privado", auth ,(req, res) => {
    res.send("Si llegas hasta acá es porque esta logueada!!");
})


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})



