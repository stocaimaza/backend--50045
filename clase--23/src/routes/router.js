//4) Creando un Custom Router. 

//A medida que el proyecto avanza y el equipo de desarrollo crece vamos a tener que pulir nuestro proyecto para que pueda escalar. 
//Una buena idea es crear nuestro propio "Router", a partir del router de express. 

//Ventajas: 

//1) Manejo sistematizado de respuestas: al personalizar el router, podemos definir formatos de respuesta en el objeto res. 

//2) Gestion de middleware interiorizada: cuando usamos app.use() a nivel de aplicación, se aplica a todos los endpoints. Al personalizar el router, podemos dinamizar el uso de middleware a nivel de router. 



//PROCESO DE CREACIÓN: 

const express = require("express");
const router = express.Router(); 

class Router {
    constructor() {
        this.router = router; 
        this.init();
    }

    getRouter() {
        return this.router; 
        //Devuelve el objeto router. 
    }

    get(path, ...callbacks) {
        //El primer argumento es la ruta. 
        //Los siguientes son los callback que se ejecutan cuando se hace GET a esta ruta determinada. 
        this.router.get(path, this.generateCustomResponse ,this.applyCallbacks(callbacks));
    }

    post(path, ...callbacks) { 
        this.router.post(path, this.generateCustomResponse ,this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        //Vamos a aplicar los callbacks a la ruta. 
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log(error);
            }
        })
    }

    //Custom responses: 

    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload});
        res.sendServerError = error => res.status(500).send({status: "error", error});
        res.sendUserError = error => res.status(400). send({status: "error", error});
        next();
    }
}






module.exports = Router;
