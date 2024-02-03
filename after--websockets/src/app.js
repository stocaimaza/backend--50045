const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;


const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

//Debo obtener el array de productos: 
const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

//Creamos el server de Socket.io
const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conecto");

    //Enviamos el array de productos al cliente que se conectó. 
    socket.emit("productos", await productManager.getProducts());

    //Recibimos el evento "eliminarProducto" desde el cliente: 
    socket.on("eliminarProducto",  async (id) => {
        await productManager.deleteProduct(id);

        //Debo enviarle la lista actualizada al cliente: 
        io.sockets.emit("productos", await productManager.getProducts());

    })
    //Agregar producto: 
    socket.on("agregarProducto", async (producto) => {
       console.log(producto);
       await productManager.addProduct(producto);
       io.sockets.emit("productos", await productManager.getProducts());
   })
    
})

