const route = require("express").Router();
const { postOrders, getAllOrders } = require("../controllers/ordersController");

route.get("/", getAllOrders);
route.post("/", postOrders);

module.exports = route;
