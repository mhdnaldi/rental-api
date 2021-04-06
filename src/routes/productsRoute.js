const route = require("express").Router();
const {
  getProductById,
  getAllProducts,
  postProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/productsController");

route.get("/", getAllProducts);
route.post("/", postProducts);
route.get("/:id", getProductById);
route.patch("/:id", updateProducts);
route.delete("/:id", deleteProducts);

module.exports = route;
