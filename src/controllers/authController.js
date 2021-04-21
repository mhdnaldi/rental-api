const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getAllUsers,
  registerUser,
  getUserByEmail,
  getUserById,
  patchUser,
  deleteUser,
} = require("../models/authModel");
const fs = require("fs");

const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
module.exports = {
  registerUser: async (req, res) => {
    try {
      let { username, email, password, confirm_password, role } = req.body;
      let checkEmail = await getAllUsers();
      checkEmail = checkEmail.map((user) => user.email);
      if (checkEmail.includes(email)) {
        return res.status(400).json({
          success: false,
          message: "THIS EMAIL IS ALREADY REGISTERED",
        });
      }
      if (!email.match(mailFormat)) {
        return res.status(400).json({
          success: false,
          message: "PLEASE ENTER A VALID EMAIL",
        });
      }
      if (!password.match(passwordFormat)) {
        return res.status(400).json({
          success: false,
          message:
            "PASSWORD MUST INCLUDES AT LEAST ONE UPPERCASE, LOWERCASE, NUMBER, AND SYMBOL",
        });
      }
      if (!confirm_password.match(password)) {
        return res.status(400).json({
          success: false,
          message: "PASSWORD NOT MATCH",
        });
      }

      const data = {
        username,
        email,
        role: role === 1 ? "Admin" : "User",
        password: await bcrypt.hash(password, 10),
      };

      await registerUser(data);
      return res.status(200).json({
        success: true,

        message: "REGISTER SUCCESS",
      });
    } catch (err) {
      return res.status(404).json({
        success: false,

        message: err.message,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await getUserByEmail(email);

      if (checkEmail.length < 1) {
        return res.status(404).json({
          success: false,
          message: "EMAIL NOT REGISTERED",
        });
      }

      console.log(checkEmail);

      const comparePassword = await bcrypt.compare(
        password,
        checkEmail[0].password
      );

      if (comparePassword) {
        const token = jwt.sign({ ...req.body }, process.env.JWT_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          success: true,
          message: "LOGIN SUCCESS",
          result: {
            ...checkEmail[0],
            password: undefined,
            created_at: undefined,
            updated_at: undefined,
            token,
          },
        });
      }
      return res.status(400).json({
        success: false,

        message: "WRONG PASSWORD",
      });
    } catch (err) {
      return res.status(404).json({
        success: false,

        message: err.message,
      });
    }
  },
  patchUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { username, address, phone, role, password } = req.body;
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "USER NOT FOUND",
        });
      }

      if (password) {
        if (!password.match(passwordFormat)) {
          return res.status(404).json({
            success: false,
            message:
              "PASSWORD MUST INCLUDES ATLEAST 1 UPPERCASE, LOWERCASE, NUMBER, SYMBOL AND MINIMUM 8 CHARACTERS",
          });
        }
        hashPassword = await bcrypt.hash(password, 10);
      }

      const updatedData = {
        username: username === "" ? user[0].username : username,
        address: address === "" ? user[0].address : address,
        phone: phone === "" ? user[0].phone : phone,
        password: password === "" ? user[0].password : hashPassword,
        images: req.file === undefined ? user[0].images : req.file.filename,
      };

      if (updatedData.images !== undefined) {
        fs.unlink(`uploads/${user[0].images}`, (err) => {
          !err ? console.log("ok") : console.log(false);
        });
      }

      const result = await patchUser(id, updatedData);
      return res.status(200).json({
        success: true,
        message: "UPDATE SUCCESS",
        result: {
          ...updatedData,
          password: undefined,
          id,
          email: user[0].email,
          role: user[0].role,
        },
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      if (user.length < 1) {
        return res.status(404).json({
          success: false,

          message: "USER NOT FOUND",
        });
      }
      await deleteUser(req.params.id);
      return res.status(200).json({
        success: true,

        message: "ACCOUNT DELETED",
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
};
