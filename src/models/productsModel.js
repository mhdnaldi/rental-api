const db = require("../helpers/db");

module.exports = {
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM vehicle WHERE id = ${id}`, (err, res) => {
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
  postProducts: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO vehicle SET ?`, data, (err, res) => {
        if (!err) {
          const newResult = {
            id: res.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateProducts: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE * FROM vehice SET ? WHERE id=${id}`, (err, res) => {
        if (!err) {
          const newResult = {
            id,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteProducts: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM vehicle WHERE id = ${id}`, (error, res) => {
        console.log(error);
        !error ? resolve(res) : reject(new Error(error));
      });
    });
  },
};
