const router = require("express").Router();

const products = require("./routes/productsRoute");

router.use("/products", products);

module.exports = router;
