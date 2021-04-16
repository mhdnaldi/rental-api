const route = require("express").Router();
const {
  registerUser,
  loginUser,
  deleteUser,
} = require("../controllers/authController");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.patch("/:id", loginUser);
route.delete("/:id", deleteUser);

module.exports = route;
