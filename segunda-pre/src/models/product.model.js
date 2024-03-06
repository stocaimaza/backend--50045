const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    img: {
        type: String, 
    },
    code: {
        type: String, 
        required: true,
        unique: true
    },
    stock: {
        type: Number, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    },
    thumbnails: {
        type: [String], 
    },
})

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;