/** SERVIDOR - MODELO POR CAPAS **/

//Ejercicio Jugueteria: 

const express = require("express");
const app = express();
const juguetesRouter = require("./routes/juguete.router.js");
require("./database.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Rutas
app.use("/juguetes", juguetesRouter);

//Listen

app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080");
})

