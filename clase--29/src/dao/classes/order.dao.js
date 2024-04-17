const OrderModel = require("../models/order.model.js");

class OrderDAO {
    async getOrders() {
        try {
            const resultado = await OrderModel.find(); 
            return resultado; 
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getOrderById(id) {
        try {
            const resultado = await OrderModel.findOne({_id:id});
            return resultado;
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async createOrder(order) {
        try {
            const resultado = await OrderModel.create(order);
            return resultado; 
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async resolveOrder(id, order) {
        try {
            const resultado = await OrderModel.updateOne({_id:id}, {$set: order});
            return resultado; 
        } catch (error) {
            console.log(error);
            return null;
        }

    }
}

module.exports = OrderDAO;