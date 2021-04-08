const route = require("express").Router();
const uploadImage = require("../middleware/multer");
const {
  getProductById,
  getAllProducts,
  postProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/productsController");

route.get("/", getAllProducts);
route.post("/", uploadImage, postProducts);
route.get("/:id", getProductById);
route.patch("/:id", uploadImage, updateProducts);
route.delete("/:id", uploadImage, deleteProducts);

module.exports = route;
