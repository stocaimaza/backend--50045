/** CLASE 27 - ARQUITECTURA DEL SERVIDOR: DISEÑO **/

//Temas de hoy: 

//1) Punto de partida al desarrollar un servidor. 
//2) Patrones de diseño. 
//3) Patron Repository. (tema de la clase que viene). 
//4) Singleton para nuestra conexión con MongoDB. 
//5) Comunicación ente el front y el backend. 

/////////////////////////////////////////////////////////////////////////

const express = require("express");
const app = express(); 
const PUERTO = 8080;
require("./database.js");
const productosRouter = require("./routes/producto.router.js");
const cors = require("cors");

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
app.use(cors());

//Rutas
app.use("/productos", productosRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando el puerto 8080");
})