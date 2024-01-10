const fs = require("fs").promises;


class ProductManager {

    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path; 
    }

    async addProduct({ title, description, price, img, code, stock}){

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

        //Acá despues de pushear el nuevo producto, tienen que guardar el array en el archivo. 
        await this.guardarArchivo(this.products);
    }

    async getProducts() {
        //Este tiene que leer el archivo y retornarlo en formato array. 
        //return this.products; 
        await this.leerArchivo()
    }

    async getProductById(id) {
       try {
        const arrayProductos = await this.leerArchivo();
        const buscado = arrayProductos.find(item => item.id === id);
        //Si buscado existe lo retorno, si no existe le puedo mandar un mensaje por consola. 
       } catch (error) {
        console.log(error);
       }
    }

    //Métodos desafio 2: 

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("error al leer el archivo", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo, vamos a morir", error);
        }
    }
}
