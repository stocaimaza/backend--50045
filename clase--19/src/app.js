/** CLASE 19 - COOKIES, SESSION & STORAGE 2 **/

//Repasemos: cookies y session.

const express = require("express");
const session = require("express-session");
//File Storage: npm i session-file-store
const FileStore = require("session-file-store");
//No se olviden de inicializarlo! 
const fileStore = FileStore(session);
const app = express();
const PUERTO = 8080;
const cookieParser = require("cookie-parser");
//Tenemos que instalar MongoStore: npm i connect-mongo
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
require("../src/database.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    //1) Memory Storage: 

    secret: "secretcoder",
    //Es el valor para firmar la cookie. 
    resave: true, 
    //Esta config me permite mantener la sesión activa frente a la inactividad del usuario. 
    saveUninitialized: true,
    //Me permite guardar cualquier sesión aun cuando el objeto de sesión no tenga nada para contener. 

    //2)File Storage: 
    //store: new fileStore({path:"./src/sessions", ttl:5, retries: 1})
    //path: ruta donde se va a guardar el archivin de la session. 
    //ttl: time to live! (en segundos)
    //retries: cantidad de veces que el servidor tratara de leer el archivo. 
    
    //3) Utilizando Mongo Storage: 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })

}))

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

//Repasito de cukis
app.get("/crearcuki", (req, res) => {
    res.cookie("cuki", "esto es una cukiii").send("Cuki creada");
})

//Borramos cuki
app.get("/borrarcuki", (req, res) => {
    res.clearCookie("cuki").send("Cuki borrada!");
})

//Recordemos: una sesión es un vinculo que se genera entre el cliente y el servidor, la data se guarda en el servidor pero el cliente almacena el sessionId. 

//Login de usuario con Session: 

app.get("/login", (req, res) => {
    let usuario = req.query.usuario; 

    req.session.usuario = usuario; 
    res.send("Guardamos el usuario por medio de query");
})

//Verificamos el usuario: 

app.get("/usuario", (req, res) => {
    if(req.session.usuario) {
        return res.send(`El usuario registrado es el siguiente: 
        ${req.session.usuario}`);
    } 

    res.send("No tenemos un usuario registrado, vamos a morir!");

})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})