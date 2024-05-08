/** CLASE 35 - CLUSTERIZACION Y ESCALABILIDAD **/

//CLUSTERIZAR NUESTRA APP: 

//console.log(process.pid);
//Obtengo el identificador del proceso. 

const express = require("express");
const cluster = require("cluster");
const { cpus } = require("os");

const numeroDeProcesadores = cpus().length;
console.log(numeroDeProcesadores);

if (cluster.isPrimary) {
    console.log("Proceso Primario: ");
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork();
    }
    cluster.on("message", worker => {
        console.log(`Mensaje recibido desde el worker: ${worker.process.pid}`);
    })
} else {
    console.log("Ahora soy un proceso worker!");
    console.log(`Mi pid es el siguiente: ${process.pid} `);

    const app = express();
    app.get("/", (req, res) => {
        res.send("Peticion atendida por un proceso worker");
    })


    app.get("/operacionsimple", (req, res) => {
        let suma = 0;
        for (let i = 0; i < 1000000; i++) {
            suma += i;
        }

        res.send({ suma });
    })

    //Operacion compleja: 

    app.get("/operacioncompleja", (req, res) => {
        let suma = 0;
        for (let i = 0; i < 5e8; i++) {
            suma += i;
        }

        res.send({ suma });
    })

    app.listen(8080, () => console.log("Escuchando en el puerto 8080"));
}

//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json