const { EErrors } = require("../services/errors/enums.js");

const manejadorError = (error, req, res, next) => {
    console.log(error.causa);
    switch(error.code) {
        case EErrors.TIPO_INVALIDO: 
        res.send({status: "error", error: error.nombre});
        break;
        default: 
        res.send({status: "error", error: "Error desconocido"}); 
    }
}

module.exports = manejadorError;