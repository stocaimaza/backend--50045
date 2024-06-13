const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
const PUERTO = process.env.PUERTO || 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

app.use(cors());

//Passport 
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

///Websockets: 
const SocketManager = require("./sockets/socketmanager.js");
new SocketManager(httpServer);

//SWAGGER: 

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

// Creamos un objeto de configuración: swaggerOptions
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de la App Tienda Marolio",
            description: "E-commerce"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

// Conectamos Swagger a nuestro servidor de Express
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));



//Codigo actualizar cantidades: 
// async updateProductQuantity(cartId, productId, updatedQuantity) {
//     try {
//       const cartItem = await CartModel.findById(cartId);
//       if (!cartItem) {
//         throw new Error('Invalid cart id');
//       }

//       const product = cartItem.products.find(
//         (item) => item.product._id.toString() === productId
//       );

//       if (!product) {
//         throw new Error('Invalid product id');
//       }

//       product.quantity = updatedQuantity;
//       cartItem.markModified('products');
//       await cartItem.save();

//       return cartItem;
//     } catch (error) {
//       console.error('Error while updating the product quantity', error);
//       throw new Error(error);
//     }
//   }