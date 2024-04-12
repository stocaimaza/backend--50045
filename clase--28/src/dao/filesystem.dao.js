const fs = require("fs");

class FileSystemDAO {
    async crearJuguete(datosJuguetes) {
        try {
            //Leemos el archivo actual
            const juguetes = await this.leerArchivo();

            //Agregamos el nuevo juguete
            juguetes.push(datosJuguetes);

            //Escribimos el archivo actualizado
            await this.escribirArchivo(juguetes);
            return datosJuguetes;
        } catch (error) {
            throw new Error("Error al crear el juguete en el DAO de archivos");
        }
    }

    async obtenerJuguetes() {
        try {
            //Leemos el archivo 
            const juguetes = await this.leerArchivo();
            return juguetes;
        } catch (error) {
            throw new Error("Error al obtener los juguetes desde el sistema de archivos");
        }
    }

    //Métodos auxiliares: 
    async leerArchivo() {
        try {
            const data = await fs.promises.readFile("./src/data.json");
            return JSON.parse(data);
        } catch (error) {
            throw new Error("Error al leer el archivo");
        }
    }

    async escribirArchivo(data) {
        try {
            await fs.promises.writeFile("./src/data.json", JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error("Error al escribir el archivo");
        }
    }
}

module.exports = FileSystemDAO;