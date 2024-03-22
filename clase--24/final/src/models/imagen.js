import mongoose, { mongo } from "mongoose";

const imagenSchema = new mongoose.Schema({
    title: String,
    description: String, 
    filename: String,
    path: String
})

const ImagenModel = mongoose.model("imagenes", imagenSchema);

export default ImagenModel;