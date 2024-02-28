/** CLASE 17 - MONGODB AVANZADO 2**/

//Temas de hoy: 
//1) Aggregations
//2) Paginacion

const mongoose = require("mongoose");
const OrderModel = require("./models/order.js");

const main = async () => {
    mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/Pizza?retryWrites=true&w=majority&appName=Cluster0")


    //Ejercicio 1: Calculamos el total de pizzas vendidas por sabores pero solo en tamaño familiar. 

    // const resultado = await OrderModel.aggregate([
    //     {
    //         $match: {
    //             tam: "familiar"
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$nombre",
    //             total : {
    //                 $sum: "$cantidad"
    //             }
    //         }
    //     },

    //     Ejercicio 2: 
    //     Ordenamos: 
    //     {
    //         $sort: {
    //             total: 1
    //             1: ascendente
    //             -1: descendente
    //         }
    //     },
    //     Guardamos los resultados en nueva coleccion llamada "reports"
    //     {
    //         $group: {
    //             _id: 10, 
    //             orders: {
    //                 Si yo quiero que los resultados se guarden en un array puedo usar $push
    //                 $push: "$$ROOT"
    //                 Root hace referencia al documento actual. 
    //             }
    //         }
    //     },
    //     Una vez que agrupamos los resultados, los guardamos en la colección: 
    //     {
    //         $project: {
    //             _id: 0,
    //             orders: "$orders"
    //             Acá le decimos que el campo "orders" va a ser igual a los resultados que guardamos en el paso anterior. 
    //         }
    //     },
    //     Ultimo paso super importante, hacemos el merge: 
    //     {
    //         $merge: {
    //             into: "reports"
    //         }
    //     }
    // ])


    // console.log(resultado);
    /////////////////////////////////////////////////////////
    //Paginacion: 

    const resultado = await OrderModel.paginate({"tam":"familiar"}, {limit: 2, page: 1});
    console.log(resultado);
    

}

main();

//Aclaracion del Chat GTP3.5: En este caso particular, la notación con comillas y sin comillas produce el mismo resultado. La notación con comillas generalmente se usa cuando el nombre del campo contiene caracteres especiales, espacios o si se desea dar claridad adicional al código. En este caso específico, ambas formas son equivalentes y el motor de agregación de MongoDB interpreta correctamente el nombre del campo sin comillas.

//2) Paginacion: 
//Es un proceso que consiste en dividir los resultados de una consulta en bloques de datos. 

//Instalamos: npm install mongoose-paginate-v2
//Usamos el método plugin en el order.js

const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas

app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1; 
    const limit = 2; 
    try {
        const pizzasListado = await OrderModel.paginate({}, {limit, page})

        //Recuperamos el docs: 

        const pizzasResultadoFinal = pizzasListado.docs.map( pizza => {
            const {_id, ...rest} = pizza.toObject();
            return rest;
        })

        res.render("pizzas", {
            pizzas: pizzasResultadoFinal, 
            hasPrevPage: pizzasListado.hasPrevPage, 
            hasNextPage: pizzasListado.hasNextPage,
            prevPage: pizzasListado.prevPage, 
            nextPage : pizzasListado.nextPage,
            currentPage: pizzasListado.page,
            totalPages: pizzasListado.totalPages
        })
        
    } catch (error) {
        console.log("Error en la paginacion", error);
        res.status(500).send("Error en el servidor, vamos a re morir todos");
    }
})

//Listen

app.listen(PUERTO);