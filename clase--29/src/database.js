const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://swtocaimaza:coderhouse@cluster0.pmzgicx.mongodb.net/Pedidos?retryWrites=true&w=majority&appName=Cluster0")
.then( () => console.log("Conexión exitosa"))
.catch( (error) => console.log(error))

