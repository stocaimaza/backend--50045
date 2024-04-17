const { getOrders, createOrder, getOrderById, resolveOrder } = require("../controller/orders.controller.js");

const Router = require("express").Router;
const router = Router(); 

router.get("/", getOrders);
router.post("/", createOrder);

router.get("/:oid", getOrderById);
router.put("/:oid", resolveOrder);

module.exports = router; 

