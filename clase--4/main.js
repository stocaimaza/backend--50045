/*** CLASE 4 - MANEJO DE ARCHIVOS ***/

//Temas de hoy: 

//1) File System. 
//2) Manejo de archivos de forma sincrónica. 
//3) Manejo de archivos con Callbacks. 
//4) Manejo de archivos con Promesas. 
//5) Manejo de datos completos. 
//6) Presentamos el desafio entregable. 

//File System es un manejador de archivos que ya viene incorporado con Node JS. Me permite realizar operaciones de CREAR, LEER, ACTUALIZAR Y BORRAR ARCHIVOS: (CRUD).

//1) Primer paso: 

const fs = require("fs");

//console.log( typeof fs);

//A) Manejo de archivos de forma sincrónica. 

const rutaSin = "./ejemplo-sin.txt"; 

//Crear un archivo 

//fs.writeFileSync(rutaSin, "Hola mundo, ¿cómo estan?");
//fs.writeFileSync(rutaSin, "llueve mucho, vamos a morir");

//Leer un archivo

// if(fs.existsSync(rutaSin)){
//     let contenido = fs.readFileSync(rutaSin, "utf-8");
//     //Primer parametro es el path, segundo es el tipo de codificación. 
//     console.log(contenido);
// } else {
//     console.log("No existe ese archivo!");
// }

//Actualizar contenidos: 
//fs.writeFileSync(rutaSin, "Hola, estamos actualizando la info");

//Agregar más contenido al final: 

//fs.appendFileSync(rutaSin, " y este texto lo agregue al final");
//AppendFile me permite agregar mas contenido al final, y si no encuentra el archivo lo crea. 

//Eliminar un archivo: 

//fs.unlinkSync(rutaSin);

//B) Trabajando con Callbacks

// const conCall = "./ejemplo-call.txt";

// fs.writeFile(conCall, "Nuevo archivo, ahora con callback", (error) => {
//     //El tercer parametro es el cb,  que pregunta si hubo un error: 
//     if(error) return console.log("No pudimos crear el archivo");

//     //Leemos el archivo: 
//     fs.readFile(conCall, "utf-8", (error, contenido) => {
//         //Acá el cb tiene dos parámetros, el error y el contenido que lee. 
//         if(error) return console.log("No lo pude leer");
//         console.log(contenido);

//         //Y si queremos agregar más info: 
//         fs.appendFile(conCall, " mas contenido", (error) => {
//             if(error) return console.log("No pudimos agregar más contenido");

//             //Y si lo quiero eliminar: 

//             fs.unlink(conCall, (error) => {
//                 if(error) return console.log("No pudimos eliminarlo, volve más tarde");
//             })
//         })
//     })
// })

//C) Manejo de archivos con Promesas. 

//Para poder trabajar con promesas, tenemos que usar la propiedad "promises" del módulo fs. 

const textoPromises = "./texto-pro.txt"; 

const operacionesAsincronicas = async () => {

    //Crear un archivo: 
    await fs.promises.writeFile(textoPromises, "Nuevo archivoooo!!");

    //Leer un archivo: 

    let respuesta = await fs.promises.readFile(textoPromises, "utf-8");
    console.log(respuesta);

    //Agregar contenido adicional: 
    await fs.promises.appendFile(textoPromises, " agregamos este texto");

    //Lo podemos releer para mostrarlo por consola de forma actualizada: 
    respuesta = await fs.promises.readFile(textoPromises, "utf-8");
    console.log(respuesta);

    //Lo eliminamos: 
    await fs.promises.unlink(textoPromises);

}

//No se olviden de invocar la función: 
operacionesAsincronicas(); 

//5) Manejo de datos completos. 

const arrayPersonas = [
    {nombre: "Pepe", apellido: "Argento", edad: 50},
    {nombre: "Moni", apellido: "Argento", edad: 38},
    {nombre: "Paola", apellido: "Argento", edad: 17},
    {nombre: "Coky", apellido: "Argento", edad: 15},
    {nombre: "Fatiga", apellido: "Argento", edad: 7},
]

const archivoArgento = "./archivo-argento.json";

// ¿Cómo lo guardamos? 

const guardarArchivo = async () => {
    await fs.promises.writeFile(archivoArgento, JSON.stringify(arrayPersonas, null, 2))
}

guardarArchivo();

//¿Cómo lo leemos? 

const leerArchivo = async () => {
    const respuesta = await fs.promises.readFile(archivoArgento, "utf-8");
    const arrayNuevo = JSON.parse(respuesta);
    console.log(arrayNuevo);
}

leerArchivo();