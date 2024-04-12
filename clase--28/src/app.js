/** CLASE 28 - ARQUITECTURA DEL SERVIDOR: PERSISTENCIA **/

const express = require("express");
const app = express(); 
const PUERTO = 8080;
require("./database.js");
const productosRouter = require("./routes/producto.router.js");
const cors = require("cors");

//Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//Rutas
app.use("/productos", productosRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando el puerto 8080");
})