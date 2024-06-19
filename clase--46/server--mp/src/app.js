//npm i express cors mercadopago

import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
const app = express();
const PUERTO = 8080;

//Nuestras credenciales: 
const client = new MercadoPagoConfig({accessToken: "APP"});

//Middleware: 
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Holis, soy el server de MP");
})

app.post("/create-preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://www.mercadolibre.com.ar",
                failure: "https://www.mercadolibre.com.ar",
                pending: "https://www.mercadolibre.com.ar"
            },
            auto_return: "approved"
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        //Se lo enviamos al front: 
        res.json({
            id: result.id
        })
    } catch (error) {
        console.log(error);
        res.send("Error mortal, vamos a re morir");
    }
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})