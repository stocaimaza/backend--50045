const UserDAO = require("../dao/classes/user.dao.js");
const OrderDAO = require("../dao/classes/order.dao.js");
const BusinessDAO = require("../dao/classes/business.dao.js");

const usersService = new UserDAO();
const ordersService = new OrderDAO();
const businessService = new BusinessDAO();

const getOrders = async (req, res) => {
    let result = await ordersService.getOrders();
    res.send(result);
}

const getOrderById = async (req, res) => {
    const {oid} = req.params; 
    let order = await ordersService.getOrderById(oid);
    res.send(order);
}

const createOrder = async (req, res) => {
    const {user, business, products} = req.body; 
    const resultUser = await usersService.getUserById(user);
    const resultBusiness = await businessService.getBusinessById(business);
    let actualOrders = resultBusiness.products.filter(product => products.includes(product.id));
    let sum = actualOrders.reduce((acc, prev) => {
        acc+= prev.price
        return acc;
    }, 0);

    let orderNumber = Date.now() + Math.floor(Math.random()*10000+1);
    let order = {
        number: orderNumber, 
        business,
        user, 
        status: "pending", 
        products: actualOrders.map(product => product.id),
        totalPrice: sum
    }

    let orderResult = await ordersService.createOrder(order);
    resultUser.orders.push(orderResult._id);
    await usersService.updateUser(user, resultUser);
    res.send(orderResult);
}

const resolveOrder = async (req, res) => {
    const {resolve} = req.query; 
    let order = await ordersService.getOrderById(req.params.oid);
    order.status = resolve; 
    await ordersService.resolveOrder(order._id, order);
    res.send({result: "Order terminada"});
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    resolveOrder
}