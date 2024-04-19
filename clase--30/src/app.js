/** CLASE 30 - MAILING Y MENSAJERIA  **/

//Temas de hoy: 

//1) Protocolo SMTP. 
//2) Nodemailer. 
//3) Twilio: Enviar mensajes por sms y también por whatsapp. 

//SMTP: (Simple Mail Tranfer Protocol): Es el protocolo que nuestras aplicaciones usan para enviar un correo electrónico. 

//Nodemailer: es una librería que nos permite realizar el envío de mensajeria desde un servicio externo como GMAIL. 
//Recuerden, que nodemailer trabaja como puente entre nuestra aplicación y los servicios de mail tradicional. 

//Instalamos nodemailer: 
//npm i nodemailer
//Se instala versión 6.9


const express = require("express");
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const app = express(); 
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//Configuramos Express-Handlebars 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
    res.send("Bienvenidos!");
})

//Ruta para mostrar la vista de Contacto: 
app.get("/contacto", (req, res) => {
    res.render("contacto");
})

//Creamos nuestro transporte: 
//Esto es un objeto especial que contiene toda la configuración que necesita el protocolo SMTP que vamos a utilizar. 

const transport = nodemailer.createTransport({
    service: "gmail", 
    port: 587,
    auth: {
        user:"coderhouse50045@gmail.com",
        pass: "yjqs fzie ywlp paql"
    }
})

//Ruta para enviar mail: 

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Anónimo ",
            to: "stocaimaza@hotmail.com",
            subject: "Correo de Prueba", 
            html: `<h1>Hola mamá, estoy programando y sin manos</h1>
                    <img src="cid:gatito1">`,

            //Para enviar un archivo adjunto: 
            attachments: [{
                filename: "gatito.jpg",
                path:"./gatito.jpg",
                cid: "gatito1"
            }]
        })

        res.send("Correo enviado correctamente. Vamos a vivir!");
        
    } catch (error) {
        res.status(500).send("Error al enviar el mail, vamos a morir todos mientras duermen "); 
    }
})

//Enviamos mensaje desde la vista de contacto: 

app.post("/enviarmensaje", async (req, res) => {
    const {email, mensaje} = req.body; 
    try {
        await transport.sendMail({
            from: "Coder Mensaje",
            to: email, 
            subject: "TEST", 
            text: mensaje
        })

        //res.send("Correo enviado correctamente!");
        //res.redirect("contacto");
        
    } catch (error) {
        res.status(500).send("Error al enviar el mail, vamos a morir todos mientras duermen "); 
    }
})

app.listen(PUERTO, () => {
    console.log("Escuchando desde el puerto de Mar del Plata");
})

//Twilio: servicio que nos permite enviar SMS, WhatsApp, chatbox, mensajes de voz.. etc. 

//Instalamos: npm i twilio

const twilio = require("twilio");

//Nos guardamos nuestras credenciales: 

const TWILIO_ACCOUNT_SID = "AC1e8ded1529395f421d95f0b55c5114e1";
const TWILIO_AUTH_TOKEN = "8ef99ce5171288b5672cf6764930a96d";
const TWILIO_SMS_NUMBER = "+12512913662";


//1) Configuramos el cliente: 
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,TWILIO_SMS_NUMBER);


//2) Creamos una ruta que envia un SMS: 

app.get("/sms", async (req, res) => {
    await client.messages.create({
        body: "Esto es un SMS de prueba, no te asustes",
        from: TWILIO_SMS_NUMBER,
        to: "+542236693878"
    })
    res.send("Enviando el SMS!");
})
