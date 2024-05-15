function generarResetToken(){
    const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return token.toString(); 
}

module.exports = {
    generarResetToken
}