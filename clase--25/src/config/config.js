const dotenv = require("dotenv");

//Vamos a hacerlo a manopla: 
//const entorno = "produccion";

//Vamos a trabajar con nuestro argumentos configurados: 
const program = require("../utils/commander.js");

const {mode} = program.opts();

dotenv.config({
    //path: entorno === "desarrollo"?"./.env.desarrollo":"./.env.produccion"
    path: mode === "desarrollo"?"./.env.desarrollo":"./.env.produccion"
})

const configObject = {
    puerto: process.env.PUERTO, 
    mongo_url: process.env.MONGO_URL
}

module.exports = configObject;