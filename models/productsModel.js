const db = require("../helpers/db");

module.exports = {
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * vehicle where id = ${id}`, (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM vehicle", (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },
  //   postProducts: (data) => {
  //     return new Promise((resolve, reject) => {
  //       db.query(
  //         `INSERT INTO vehicle (${Object.keys(data)}) VALUES (${Object.values(
  //           data
  //         ).map((val) => `"${val}"`)})`,
  //         (err, res) => {
  //           !err ? resolve(res) : reject(err);
  //         }
  //       );
  //     });
  //   },
};
