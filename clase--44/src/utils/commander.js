const {Command} = require("commander");
const program = new Command(); 


//Recuerden: 
//1 - Comando, 2 - La descripción, 3 - Valor por default
program
    .option("--mode <mode>", "modo de trabajo", "produccion")
program.parse();

module.exports = program; 