/*Generamos una instancia de Socket.io, ahora desde el lado del cliente*/

const socket = io(); 

//Cuando yo quiero comenzar con la conexión y voy a enviar un mensaje al server, puedo hacer lo siguiente: 

socket.emit("mensaje", "Hola Mundo! te escribo desde el cliente!" );
//Envio mensaje al servidor. 

//Recibimos mensaje del servidor: 
socket.on("saludito", (data) => {
    console.log(data);
})

//Recibimos el array de usuarios: 

socket.on("usuarios", (data) => {
    
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "";

    data.forEach(usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido} </li>`
    })
})