//1 Desafio entregable Backend. 

class ProductManager {

    static ultId = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, img, code, stock){

        //Validamos que se agregaron todos los campos: 
        if(!title || !description || !price || !img || !code || !stock){
            console.log("Todos los campos son obligatorios"); 
            return;
        }

        //Validamos que el código sea único: 
        if(this.products.some(item => item.code === code)) {
            console.log("El código debe ser único.. o todos moriremos!");
            return;
        }

        //Creamos un nuevo objeto: 
        const newProduct = {
            id: ++ProductManager.ultId,
            title, 
            description,
            price,
            img,
            code, 
            stock
        }

        //Lo agrego al array: 
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products; 
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.error("Not Found!, maldita rata de dos patas!"); 
        } else {
            console.log(product);
        }
    }
}

//Testing: 

//1) Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager(); 

//2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(manager.getProducts());

//3) Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

manager.addProduct("Producto prueba", "esto es un producto prueba", 200, "sin imagen", "abc123", 25);

//4)El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

//5)Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

console.log(manager.getProducts());

//6)Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

// manager.addProduct("Producto prueba", "esto es un producto prueba", 200, "sin imagen", "abc123");

manager.addProduct("Fideos", "los mas ricos", 200, "sin imagen", "abc124", 25);
manager.addProduct("Arroz", "El que nunca se pasa", 200, "sin imagen", "abc125", 25);

console.log(manager.getProducts());

//7) Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

console.log("Verificamos ");
manager.getProductById(20);
