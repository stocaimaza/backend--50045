const suma = (...numeros) => {
    if(numeros.length === 0) return 0;
    if(!numeros.every(num => typeof num === "number")) return null; 
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

module.exports = suma; 

//NPM CI me permite instalar las dependencias pero leyendo el packaje-lock.json

//NPM AUDIT busca vulnerabilidades con respecto a las versiones de las dependencias que tenemos instaladas. 

//NPM AUDIT FIX --FORCE lo arregla. 

