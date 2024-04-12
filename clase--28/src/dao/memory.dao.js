class MemoryJuguetesDAO {
    constructor() {
        this.juguetes = [];
    }

    crearJuguete(datosJuguetes){
        this.juguetes.push(datosJuguetes)
        return datosJuguetes;
    }

    obtenerJuguetes(){
        return this.juguetes;
    }
}

module.exports = MemoryJuguetesDAO; 