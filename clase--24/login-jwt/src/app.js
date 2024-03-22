//npm i mongoose express jsonwebtoken cookie-parser passport passport-jwt express-handlebars


const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const initializePassport = require("./config/passport.config.js");
require("./database.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas

app.use("/", viewsRouter);
app.use("/", userRouter);

app.listen(PUERTO, ( ) => {
    console.log(`Escuchando en el PUERTO: ${PUERTO}`);
})