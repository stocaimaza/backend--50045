//instalamos: npm i dotenv

require("dotenv").config();

const config = {
    persistence: process.env.PERSISTENCE || "mongo" //Opción por defecto
}

module.exports = config; 