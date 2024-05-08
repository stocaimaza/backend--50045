const express = require("express");
const PUERTO = 8080;
const app = express();

app.get("/", (req, res) => {
    res.send("Olis, como estan? ");
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})