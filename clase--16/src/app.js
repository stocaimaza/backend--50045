/** CLASE 16 - MONGO AVANZADO 1**/

//1) Teoría de la indexación. 
//2) Manejo de Populations en MongoDB.
//3) PRE

//1) Teoría de la indexación: 

//La indexación es una técnica o proceso que se realizamos para tener respuesta a las consultas mucho más rapido. 

//Este nos permitirá tener una referencia previa al momento de buscar un documento, con el fin de evitar recorrer toda la colección, documento por documento, hasta encontrar dicho valor. 

//Esta referencia es la que se conoce como indice y se crea a partir de uno o varios campos del documento. 


///////////////////////////////////////////////////////////////////
/*
const mongoose = require("mongoose");
const UserModel = require("./models/user.js");

const main = async () => {
    await mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/Coder?retryWrites=true&w=majority&appName=Cluster0")

    const respuesta = await UserModel.find({edad: {$lt:19}}).explain("executionStats"); 
    //El método explain me da una estadistica de la consulta y le paso el parametro "executionStats" para obtener todos los detalles. 
    console.log(respuesta);
}

main(); 

//Resultados de la consulta: 
//nReturned: 25000
//executionTimeMillis: 13milisegundos. 

//Consultemos por "Carlos"
//nReturned: 111
//executionTimeMillis: 18milisegundos. 

//Si aplicamos el indice buscando a carlos me demora 0 milisegundos. 

//Si busco a menores de 19 años, me retorna 384 documentos y demora 1milisegundo con el indice en edad. 

//Cuidado con la cache! Porque guarda las respuestas previas. 

//2) Manejo de Populations en MongoDB. 

//Populate es una función de Mongoose que nos permite relacionar documentos de diferentes colecciones. 

//Por ejemplo yo en mi colección de alumnos tengo un campo que se llama cursos, y en ese campo yo tengo un array de objetos que son los cursos en los cuales estoy cursando en este momento. 
*/
/////////////////////////////////////////////////////////
//Ejercicio con Cursos y Alumnos aplicando Populations


const mongoose = require("mongoose");
const AlumnoModel = require("./models/alumno.js");
const CursoModel = require("./models/curso.js");


const main = async () => {
    await mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/Coder?retryWrites=true&w=majority&appName=Cluster0")

    //const estudiante = await AlumnoModel.findById("65d7f2de6f76626ada4f59f5");
    //const cursoBackend = await CursoModel.findById("65d7ec236f76626ada4f59ed");

    //console.log(estudiante);
    //console.log(cursoBackend);

    //Ahora ingreso el curso al alumno: 

    //estudiante.cursos.push(cursoBackend);

    //Actualizo el documento:
    //await AlumnoModel.findByIdAndUpdate(estudiante._id, estudiante);

    //Ahooooora, si quiero ver el alumno con sus cursos, yo puedo hacerlo asi: 

    const estudianteConCursos = await AlumnoModel.findById("65d7f2de6f76626ada4f59f5")
    //.populate("cursos");

    console.log(JSON.stringify(estudianteConCursos, null, 2));
    
}

main();