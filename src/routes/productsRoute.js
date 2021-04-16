const route = require("express").Router();
const uploadImage = require("../middleware/multer");
const authorization = require("../middleware/auth");
const {
  getProductById,
  getAllProducts,
  postProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/productsController");

route.get("/", getAllProducts);
route.post("/", authorization, uploadImage, postProducts);
route.get("/:id", getProductById);
route.patch("/:id", authorization, uploadImage, updateProducts);
route.delete("/:id", authorization, uploadImage, deleteProducts);

module.exports = route;
