const route = require("express").Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  patchUser,
} = require("../controllers/authController");
const uploadImage = require("../middleware/multer");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.patch("/:id", uploadImage, patchUser);
route.delete("/:id", deleteUser);

module.exports = route;
