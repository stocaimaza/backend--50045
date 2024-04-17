const CartModel = require("../models/cart.model.js");

class CartRepository {

    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({ products: [] });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async obtenerProductosDelCarrito(idCarrito) {
        try {
            const carrito = await CartModel.findById(idCarrito);
            if (!carrito) {
                console.log("No existe ese carrito con el id");
                return null;
            }
            return carrito;
        } catch (error) {
            throw new Error("Error");
        }
    }


    async agregarProducto(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.obtenerProductosDelCarrito(cartId);
            const existeProducto = carrito.products.find(item => item.product._id.toString() === productId);

            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productId, quantity })
            }

            //Marcamos la propiedad "products" como modificada antes de guardar: 
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async eliminarProducto(cartId, productId) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }

            carrito.products = carrito.products.filter(item => item.product._id.toString() !== productId);

            await carrito.save();
            return carrito;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async actualizarProductosEnCarrito(cartId, updatedProducts) {
        try {
            //console.log(updatedProducts);
            const carrito = await CartModel.findById(cartId);

            if (!carrito) {
                throw new Error("Carrito no encontrado, vamos a morir");
            }

            carrito.products = updatedProducts;
            
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            //console.log(error);
            throw new Error("Error");
        }
    }

    async actualizarCantidadesEnCarrito(cartId, productId, newQuantity) {
        try {
            const carrito = await CartModel.findById(cartId);

            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }

            const productoIndex = carrito.products.findIndex(item => item.product._id.toString() === productId);
            console.log("El indiceee ahhh re loco: ");
            console.log(productoIndex);

            if (productoIndex !== -1) {
                carrito.products[productoIndex].quantity = newQuantity;
                
                carrito.markModified("products");
                await carrito.save();
                return carrito;
            } else {
                throw new Error("Producto no encontrado en el carrito")
            }
        } catch (error) {
            throw new Error("Error");
        }
    }

    async vaciarCarrito(cartId) {
        try {
            const carrito = await CartModel.findByIdAndUpdate(
                cartId,
                { products: [] },
                { new: true }
            )

            if (!carrito) {
                throw new Error("Carrito no existeeee, no exissssssssssteeeeeee");
            }

            return carrito;

        } catch (error) {
            throw new Error("Error");
        }
    }

}

module.exports = CartRepository;