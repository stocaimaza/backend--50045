import express from "express";
const app = express();
const PUERTO = 8080;
import exphbs from "express-handlebars";
import multer from "multer";
import passport from "passport";
import session from "express-session";
import { initializePassport } from "./config/passport.config.js";
import imagenRouter from "./routes/imagen.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import "../src/database.js";

//Express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
app.use(multer({storage}).single("image"));
//Session
app.use(session({
    secret:"mi_secreto",
    resave: false,
    saveUninitialized: false
}))
//Passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport();


//Rutas

app.use("/", imagenRouter);
app.use("/", viewsRouter);
app.use("/", sessionRouter);


//Iniciamos el servidor 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})