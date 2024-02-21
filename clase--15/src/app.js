/** PRACTICA INTEGRADORA N°1**/

//Temas que tenemos que ver: 

//Clases
//Express
//Router y Multer
//Express-Handlebars
//MongoDB y Mongoose

//Actividad: generar un Pinterest, almacenando información en nuestra base de datos. 

//npm install express mongoose multer express-handlebars

///////////////////////////////////////////////////////

const express = require("express");
const app = express(); 
const exphbs = require("express-handlebars");
const multer = require("multer");
const imagenRouter = require("./routes/imagen.router.js");
const PUERTO = 8080;
require("../src/database.js");

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
app.use(multer({storage}).single("image"));



//Rutas
app.use("/", imagenRouter);



//Iniciamos el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
})