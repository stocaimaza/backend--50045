const express = require("express");
const userRouter = require("./routes/user.router.js");
const businessRouter = require("./routes/business.router.js");
const orderRouter = require("./routes/order.router.js");
require("./database.js");
const app = express(); 
const PUERTO = 8080;
const cors = require("cors");
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//Router
app.use("/api/users", userRouter);
app.use("/api/business", businessRouter);
app.use("/api/order", orderRouter);


//Listen 
app.listen(PUERTO, () => {
    console.log(`Escuchando en el PUERTO: ${PUERTO}`);
})