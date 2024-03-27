//Proceso de Argumentos con Commander: 

const {Command} = require("commander");
const program = new Command(); 


//1 - Comando // 2 - La descripción // 3 - Valor por default 
program
    .option("-p <port>", "Puerto en el que se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse();

console.log("Opciones: ", program.opts());
//Con esto puedo ver todas las opciones que configuramos. 

module.exports = program; 
//No se olviden de exportarlo. 