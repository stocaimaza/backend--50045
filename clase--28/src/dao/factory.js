const config = require("../config/config.js");

let DAO;

switch(config.persistence) {
    case "mongo":
        DAO = require("../dao/mongo.dao.js");
        break;
    case "memory":
        DAO = require("../dao/memory.dao.js");
        break;
    case "file":
        DAO = require("../dao/filesystem.dao.js")
        break;
    default: 
        throw new Error("Persistencia no válida, escribiii bieeeeennnn!!!");
}

module.exports = DAO; 

