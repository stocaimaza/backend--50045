/** CLASE 3 - PROGRAMACIÓN SINCRÓNICA Y ASINCRÓNICA **/

//Temas de hoy: 

//1) Enfoque sincrónico y asincrónico
//2) Callback
//3) Promesas
//4) Async Await
//5) Fetch 

//////////////////////////////////////

//1) Sincronismo Vs Asincronismo

//Recordemos que la programacion SINCRONICA es un enfoque o estilo de programación en el que las tareas se ejecutan secuencialmente. 

console.log("Primero");
console.log("Segundo");
console.log("Tercero");

//Ejemplo con funciones: 

function a() {
    console.log("1");
    b();
}

function b() {
    console.log("2");
    c();
}

function c() {
    console.log("3");
}

a(); // 1 2 3

//Programación Asincrónica. 

//Es un enfoque o estilo de programación en que las tareas se ejecutan en segundo plano y NO BLOQUEAN la ejecución de la siguiente tarea.  
//Es decir que cada tarea es independiente. 
//Ejemplo: cuando hago una petición a una API, no voy a bloquear la ejecución de mi código hasta que la petición se complete. 

//setTimeout, la vamos a utilizar para simular una petición a una API. 

setTimeout( () => {
    console.log("Primer tarea");
}, 1000 )

console.log("Segunda tarea, ahh re loco");

//¿Que se muestra primero? Segunda tarea. La primer tarea se va a ejecutar en segundo plano y no bloque la ejecución de la segunda tarea. 

//2) Callback. 

//¿Que es un callback? Esta es una función que pasamos como argumento a otra función. 

//Ojota! No confundir con las FOS. 

function suma (numA, numB, callback) {
    let resultado = numA + numB;
    callback(resultado);
}

function mostrarResultado(tinkiwinki) {
    console.log("El resultado de su operación es " + tinkiwinki);
}

suma(10, 5, mostrarResultado);

//el callback acá es mostrarResultado. 

function resta(numA, numB, cb) {
    let resultado = numA - numB;
    cb(resultado);
}

resta(30,10, mostrarResultado);

//Cuidado con los callback anidados o "Callback Hell"!!

//Ejemplo: 

function sumarProductos( productoA, productoB, callback) {
    let resultado = productoA + productoB;
    callback(resultado);
}

function calcularIva (monto, callback) {
    let montoConIva = monto * 1.21;
    callback(montoConIva);
}

function calcularDescuento(monto) {
    let montoConDescuento = monto - (monto * 0.10);
    console.log("El precio final del producto es: " + montoConDescuento );
}

sumarProductos(100, 200, (resultado) => {
    calcularIva(resultado, (resultadoConIva) => {
        calcularDescuento(resultadoConIva);
    })
})

//Trabajar de esta manera resulta inconveniente porque el código se vuelve poco legible, es dificil de reutilizar y mantener. 

//3) Promesas. 
//Las promesas son objetos que representan un hecho eventual a futuro. Las vamos a utilizar en operaciones asincrónicas que pueden resultar exitosas o fallidas. 

//Las promesas tienen 3 estados: 

//Pendiente (pending): Estado inicial de una promesa. Aun no se completa ni se rechaza. 
//Exitosa: (fullfilled): La operación asincrónica se completo conrrectamente. 
//Fallida: (rejected): La operación asincrónica falló y se rechazo la promesa. 

//Creación de una promesa: 

//Ejemplo: 
const promesa = new Promise((resolve, reject) => {
    //Acá en el cuerpo de la función, colocamos el código que queremos ejecutar. 

    //resolve y reject son funciones que nos provee la promesa para indicarle el estado de la misma. 

    let estado = true; 

    if(estado) {
        resolve("Exito en la promesa!"); 
    } else {
        reject("Error en la promesa, vamos a morir todos! ");
    }
})

console.log(promesa);

//Métodos THEN y CATCH: 
//Estos métodos nos permiten manejar el resultado de la promesa. Se usan concatenados a la promesa. 

//THEN: recibe como argumento una función que se va a ejecutar cuando la promesa se resuelva exitosamente. 
//CATCH: Se va a ejecutar caundo la promesa se rechace. 
//FINALLY:  Es opcional, se agrego en la version ES8 y se ejecuta siempre, sin importar si se cumple o se rechaza la promesa. 

promesa
    .then(() => console.log("Exitoooo!!!"))
    .catch(() => console.log("Rechazadooo!!!"))
    .finally(() => console.log("Fin del proceso"))


//Vamos a practicarlo un poquito más real con un array de datos. 

const productos = [
    {id: 1, nombre: "Mesa", precio: 5000},
    {id: 2, nombre: "Silla", precio: 1000},
    {id: 3, nombre: "Cuadro", precio: 500},
]

//Voy a crear una promesa que me retorne un producto por su ID: 

function buscarProductoPorId(id) {
    return new Promise((resolve, reject) => {
        setTimeout( ()=> {
            const producto = productos.find(item => item.id === id); 

            if(producto) {
                resolve(producto);
            } else {
                reject("No existe el producto, moriras rata de dos patas!");
            }
        }, 2000)
    })
}

//Ahora lo invocamos: 

buscarProductoPorId(5)
    .then((producto) => console.log(producto))
    .catch((error) => console.log(error))

//4) Async Await: 

//Con la palabra await genero una pausa en la ejecución del código hasta que la promesa se resuelva o se rechace. 

//Ejemplo: 

// async function buscarProductoPorIdAsyn (id) {
//     const producto = await buscarProductoPorId(id); 
//     console.log(producto); 
// }

// buscarProductoPorIdAsyn(3);
   

//Generalmente se usa en conjunto con el bloque try catch, para manejar errores: 

//Ejemplo: 

async function buscarProductoPorIdAsyn(id) {
    try {
        const producto = await buscarProductoPorId(id);
        console.log(producto); 
    } catch (error) {
        console.log(error)
    }
}

buscarProductoPorIdAsyn(1);

//5) Fetch: Consultamos alguna API
//Actualmente usamos FETCH para hacer peticiones a una API. 
//Fetch es una función que recibe como parámetro la URL de la api y devuelve una promesa. 

fetch("https://jsonplaceholder.typicode.com/users")
    .then(respuesta => respuesta.json())
    //Lo paso por el método json para obtener los datos. 
    .then(usuarios => console.log(usuarios))