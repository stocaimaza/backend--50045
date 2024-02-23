const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        index: true
    },
    apellido: String, 
    email : {
        type: String,
        unique: true, 
        required: true
    },
    edad: Number, 
    //cursos: []
    cursos: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "cursos"
    }]
})

//Middleware Pre de Mongoose: 

alumnoSchema.pre("findOne", function(next) {
    this.populate("cursos");
    next();
})

const AlumnoModel = mongoose.model("alumnos", alumnoSchema);

module.exports = AlumnoModel;