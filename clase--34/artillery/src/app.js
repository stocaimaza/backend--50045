const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();
const PUERTO = 8080;
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const initializePassport = require("./config/passport.config.js");
require("./database.js");

//Middleware 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

app.listen(PUERTO, () => {
    console.log(`Puerto: ${PUERTO}`);
})


//Testeamos: 
//artillery run config.yml --output test.json
//artillery report test.json -o testresultados.html