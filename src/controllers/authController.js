const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getAllUsers,
  registerUser,
  getUserByEmail,
  getUserById,
  deleteUser,
} = require("../models/authModel");

const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
module.exports = {
  registerUser: async (req, res) => {
    try {
      let { username, email, password, confirm_password } = req.body;
      let checkEmail = await getAllUsers();
      checkEmail = checkEmail.map((user) => user.email);
      if (checkEmail.includes(email)) {
        return res.json({
          success: false,
          status: 403,
          message: "THIS EMAIL IS ALREADY REGISTERED",
        });
      }
      if (!email.match(mailFormat)) {
        return res.json({
          success: false,
          status: 403,
          message: "PLEASE ENTER A VALID EMAIL",
        });
      }
      if (!password.match(passwordFormat)) {
        return res.json({
          success: false,
          status: 403,
          message:
            "PASSWORD MUST INCLUDES AT LEAST ONE UPPERCASE, LOWERCASE, NUMBER, AND SYMBOL",
        });
      }
      if (!confirm_password.match(password)) {
        return res.json({
          success: false,
          status: 403,
          message: "PASSWORD NOT MATCH",
        });
      }

      const data = {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      };

      await registerUser(data);
      return res.json({
        success: true,
        status: 200,
        message: "REGISTER SUCCESS",
      });
    } catch (err) {
      return res.json({
        success: false,
        status: 403,
        message: err.message,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await getUserByEmail(email);
      if (!checkEmail) {
        return res.json({
          success: false,
          status: 403,
          message: "EMAIL NOT REGISTERED",
        });
      }

      const comparePassword = await bcrypt.compare(
        password,
        checkEmail[0].password
      );

      if (comparePassword) {
        const token = jwt.sign({ ...req.body }, process.env.JWT_KEY, {
          expiresIn: "1d",
        });

        return res.json({
          success: true,
          status: 200,
          message: "LOGIN SUCCESS",
          result: {
            email,
            token,
          },
        });
      }
      return res.json({
        success: false,
        status: 403,
        message: "WRONG PASSWORD",
      });
    } catch (err) {
      return res.json({
        success: false,
        status: 403,
        message: err.message,
      });
    }
  },
  patchUser: async (req, res) => {
    try {
      const id = req.params.id;
    } catch (err) {
      return res.json({
        success: false,
        status: 403,
        message: err.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      if (user.length < 1) {
        return res.json({
          success: false,
          status: 403,
          message: "USER NOT FOUND",
        });
      }
      await deleteUser(req.params.id);
      return res.json({
        success: false,
        status: 200,
        message: "ACCOUNT DELETED",
      });
    } catch (err) {
      return res.json({
        success: false,
        status: 403,
        message: err.message,
      });
    }
  },
};
