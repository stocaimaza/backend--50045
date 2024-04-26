const generarInfoError = (usuario) => {
    return ` Los datos estan incompletos o son invalidos. 
        Necesitamos recibir lo siguiente: 
        - Nombre: String, pero recibimos ${usuario.nombre}
        - Apellido: String, pero recibimos ${usuario.apellido}
        - Email: String, recibimos ${usuario.email}
    `;
}

module.exports = {
    generarInfoError
}