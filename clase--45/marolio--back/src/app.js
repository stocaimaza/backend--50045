const express = require("express");
const app = express(); 
const PUERTO = process.env.PUERTO || 8080;
const productosRouter = require("./routes/productos.router.js");
const ordenesRouter = require("./routes/ordenes.router.js");
const mongoose = require("mongoose");
const cors = require('cors');

const connect = mongoose.connect("mongodb+srv://swtocaimaza:coderhouse@cluster0.pmzgicx.mongodb.net/Marolio?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Conectados") );

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors());

//Rutas

app.use("/api/productos", productosRouter);
app.use("/api/ordenes", ordenesRouter);

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080")});