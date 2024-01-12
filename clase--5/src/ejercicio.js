/*Calculadora de Edad*/

//Primer pasito instalamos: npm i moment 

//Segundo paso: importamos
const moment = require("moment");

//Variable que almacene la fecha actual
const fechaActual = moment(); 

//Variable que almacene la fecha de nacimiento
const fechaNacimiento = moment("1987-03-10"); 

//Validamos la fecha con isValid
if(fechaNacimiento.isValid()){
    //Calculamos la diferencia

    let diasPasados = fechaActual.diff(fechaNacimiento,"days"); 
    //Mostramos por consola: 
    console.log(`Pasaron desde que naci hasta hoy ${diasPasados}, estamos viejos`);
} else {
    console.log("La fecha no es valida");
}