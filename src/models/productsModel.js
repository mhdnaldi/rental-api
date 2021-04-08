const db = require("../helpers/db");

module.exports = {
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM vehicle WHERE id = ${id}`, (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },
  getAllProducts: (search, offset, limit, category) => {
    let syntax = `AND vehicle_type LIKE "${category}"`;
    if (category === "All") {
      syntax = "";
    }
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM vehicle WHERE vehicle_name LIKE "%${search}%"${syntax} LIMIT ${limit} OFFSET ${offset} `,
        (err, res) => {
          !err ? resolve(res) : reject(new Error(err));
        }
      );
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
      const keys = Object.keys(data);
      const values = Object.values(data);
      db.query(
        `UPDATE vehicle SET ${keys.map(
          (key, index) => `${key} = "${values[index]}"`
        )} WHERE id = ${id}`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteProducts: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM vehicle WHERE id = ${id}`, (err, res) => {
        !err ? resolve(res) : reject(new Error(err));
      });
    });
  },
  getTotalCount: (name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) as total FROM vehicle WHERE vehicle_name LIKE "%${name}%"`,
        (err, res) => {
          !err ? resolve(res[0].total) : reject(new Error(err));
        }
      );
    });
  },
};
