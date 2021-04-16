const router = require("express").Router();

const products = require("./routes/productsRoute");
const orders = require("./routes/ordersRoute");
const auth = require("./routes/authRoute");

router.use("/products", products);
router.use("/orders", orders);
router.use("/users", auth);

module.exports = router;
