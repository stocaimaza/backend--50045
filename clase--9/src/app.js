/** CLASE 9 - MOTORES DE PLANTILLAS **/

//Temas de hoy: 
//1)¿Qué son los motores de plantillas?
//2) Handlebars, instalación y uso. 
//3) Estructuras, condicionales y ciclos. 
//4) Creamos el router de Handlebars. 
//5) Agregamos JS y CSS. 

//1) Motores de plantillas: son herramientas que nos permite generar html dinámico. 

//2) Handlebars, instalación y uso: 
//instalamos con el siguiente comando: npm install express-handlebars
//Si queres instalar todo junto: npm install express express-handlebars

//Armamos nuestro server: 

const express = require("express");
const app = express(); 
const PUERTO = 8080; 
const exphbs = require("express-handlebars");
const viewsRouter = require("./routes/views.router.js");

//Carpetiña public
app.use(express.static("./src/public"));


//Configuramos handlebars: 
app.engine("handlebars", exphbs.engine());
//Acá estamos configurando el motor de plantillas. le digo a express que cuando encuentre un archivo .handlebars, lo renderice con el motor de plantillas. 
app.set("view engine", "handlebars");
//Acá también le decimos que el motor de plantillas a usar es Handlebars. 

app.set("views", "./src/views");
//Acá le decimos donde se encuentran los archivos .handlebars

//Rutas
app.use("/", viewsRouter);


app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO} `);
})
