const db = require("../helpers/db");

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = "${email}"`, (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },

  registerUser: (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (${keys.map((key) => key)}) VALUES (${values.map(
          (value) => `"${value}"`
        )})`,
        (err, res) => {
          !err ? resolve(res) : reject(new Error(err));
        }
      );
    });
  },
  patchUser: (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET ${keys.map((key, i) => `${key} = "${values[i]}"`)} `,
        (err, res) => {
          !err ? resolve(res) : reject(new Error(err));
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from users WHERE id = ${id}`, (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },
};
