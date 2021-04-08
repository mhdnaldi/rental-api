const router = require("express").Router();

const products = require("./routes/productsRoute");
const orders = require("./routes/ordersRoute");

router.use("/products", products);
router.use("/orders", orders);

module.exports = router;
