const route = require("express").Router();
const {
  getProductById,
  getAllProducts,
} = require("../controllers/productsController");

route.get("/", getAllProducts);
route.get("/:id", getProductById);

module.exports = route;
