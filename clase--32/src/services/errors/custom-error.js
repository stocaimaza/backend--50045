//Creamos una clase para generar nuestros propios errores: 

class CustomError {
    static crearError({nombre = "Error", causa = "Desconocido", mensaje, codigo = 1}){
        const error = new Error(mensaje); 
        error.name = nombre;
        error.causa = causa;
        error.code = codigo;
        throw error; 
        //Lanzamos el error, esto detiene la ejecución de la app, por eso debemos capturarlo en el otro módulo. 
    }

}

module.exports = CustomError; 