/** CLASE 8 - **/

//Temas de hoy: 

//1) Express Router
//2) Middleware
//3) Servicios de archivos estáticos
//4) Multer
//5) Primera Pre Entrega del Proyecto Final. (Cuidado!)

//1) Express Router: herramienta que me permite separar mis rutas en distintos módulos. 

//ejercicio de práctica: Mascotas y Usuarios. 

const express = require("express");
const app = express();
const PUERTO = 8080; 
const userRouter = require("./routes/users.router");
const petsRouter = require("./routes/pets.router");

//Tenemos que decirle a la app que vamos a trabajar con datos en formato JSON. 

//Middleware
app.use(express.json());
//Para manipular datos JSON
app.use(express.urlencoded({extended:true}));
//Para recibir datos complejos. 

//Routes
app.use("/api/users", userRouter);
app.use("/api/pets", petsRouter);

//ejemplo pre entrega: (no es parte de este ejercicio!)
// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);


//No se olviden del listen. 
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})

//3) SERVICIOS DE ARCHIVOS ESTÁTICOS: 
//Express nos permite tener archivos estáticos, es decir archivos que no cambian, como html, css, imagenes, etc. 
//Estos recursos estan visibles para e cliente de forma directa. 
//Y los vamos a crear en la carpetiña: public

//Si yo quiero que al ingresar al localhost:8080 me muestre mi index.html, primero tengo que convertir a la carpeta public en un recurso estático. 

//Lo realizamos con la siguiente linea de código: 

// app.use(express.static("public"));


//Prefijo virtual: si queremos que la carpetita public se llame de otra forma, podemos cambiarlo de la siguiente manera: 

app.use("/firulais", express.static("public"));

//¿Cuales son las ventajas de usar un prefijo virtual ?
// - Me puedo organizar mejor con las rutas. 
// - Me da una capa de seguridad adicional. 


//4) Middleware. 

//Middleware es una función  que se ejecuta entre la petición y la respuesta. Funciona como un intermediario entre ambos. 

//¿Para que sirve? 

// - Autorizar o rechazar usuarios. 
// - Agregar o alterar el contenido de la petición. 
// - Redireccionar a otra ruta. 
// - En algunos casos puede detener la ejecución de la petición (seguridad)

//5) Multer: middleware de terceros que me permite cargar archivos al servidor.

//A) Instalar: npm i multer
//B) Importamos el módulo: 

const multer = require("multer");

//Si queremos que los archivos se guarden en la carpeta correcta, con formato y el nombre original, tenemos que configurar un storage: 
//En el storage vamos a configurar dos propiedades: destination y filename. Como y donde se van a guardar los archivines. 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img"); 
        //Carpeta donde se guardan las imagenes. 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        //Mantengo el nombre original
    }
    
})

// const upload = multer({dest:"public/img"}); 
const upload = multer({storage: storage});
//Voy a configurar donde se van a guardar los archivos que suba el cliente. 

app.post("/upload", upload.single("imagen"), (req, res) => {
    res.send("Imagen cargada");
} )
