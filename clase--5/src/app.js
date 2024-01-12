/** CLASE 5 **/

//Temas de hoy: 

//1) Node y NPM
//2) Pasos para organizar mi proyecto. 
//3) Módulos propios
//4) Módulos Nativos
//5) Módulos de Terceros


//Módulo: es un archivo de JS que contiene un conjunto de funciones que nos permiten resolver una tarea en particular. 

//¿Cómo trabajamos con módulos en backend? 

//A) Módulos escritos por nosotros: 

//Lo podemos trabajar de dos formas: CommonJS y ES Modules. 

//Importamos con CommonJS

// const saludos = require("./saludos.js");

// saludos.temprano();

// saludos.tarde();

// saludos.noche();

//A partir del año 2015, se incorporó una nueva forma de trabajar con módulos en JS llamada ES Modules. 

import { temprano, tarde, noche } from "./saludos.js";

temprano(); 
tarde();
noche();

//Recuerden colocar el "type":"module" en el packaje.json. 

//Módulos nativos: estos vienen por default en Node JS. Y ya contienen un conjunto de funciones que nos permiten resolver una tarea en particular. 

//Los más conocidos: 

//fs: para trabajar con un sistema de archivos. 
//http: para crear un servidor web. 
//path: para trabajar con rutas de archivos. 
//crypto: para trabajar con encriptación de datos. 
//timers: para trabajar con tareas asincrónicas. 
//console: para mostrar mensajes en consola. 

//5) Módulos de Terceros: 

//Si queremos descargar un módulo de terceros usamos NPM Node Package Manger. 


//¿Que es un paquete? Es un conjunto de módulos que resuelven una tarea en particular. 

//Pasos para instalar un nuevo paquete: 
//npm install nombrePaquete

//Dependencia: es un paquete o módulo externo que mi proyecto necesita para funcionar. 

//Pasos para desistalar una depedencia o paquete. 
//npm uninstall nombrePaquete

//Dependencias de desarrollo: son aquellos que solo necesitamos para desarrollar nuestra aplicación. Ejemplo el clásico nodemon. 
//¿Cómo lo instalamos? npm install nodemon -D

//Scripts: Son un conjunto de comandos que nos permiten ejecutar tareas en nuestro proyecto. 
//Ejemplo "npm run dev". 

//Manejo de versiones: 
//Para instalar versiones previas: npm install moment@1.0.0

//Tenemos un comando para revisar si tenemos paquetes o depedencias en versiones antiguas: npm outdated

//Para actualizar usamos npm update (guarda que el packaje.json no se actualiza!)


//Para instalar versiones globales de dependencias usamos el -g
//Si queremos revisar las dependencias globales de nuestra compu usamos npm list -g


