const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    number: Number, 
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    products: [],
    totalPrice: Number,
    status: String
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel; 