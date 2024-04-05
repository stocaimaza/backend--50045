const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse50045:coderhouse@cluster0.fpmis3v.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conectados a la BD"))
    .catch((error) => console.log("Llueve el finde: ", error))


