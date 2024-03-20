const Router = require("./router.js"); 

class UserRouter extends Router {
    init() {
        //Acá colocamos todas nuestras rutas: 
        this.get("/", (req, res) => {
            //res.send("Esto es un get de usuarios");
            res.sendSuccess("Hola alumnos, viva dormir la siesta!!");
        })

        this.post("/", (req, res) => {
            res.send("Post de usuarios");
        })
    }
}


module.exports = UserRouter;
