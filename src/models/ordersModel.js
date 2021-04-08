const db = require("../helpers/db");

module.exports = {
  postOrders: (data) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO orders SET ?", data, (err, res) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  getAllOrders: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT orders.id, orders.total_price, orders.total_qty, orders.days, orders.created_at, vehicle.vehicle_name, vehicle.rental_price, vehicle.images FROM orders JOIN vehicle ON orders.vehicle_id = vehicle.id ORDER BY created_at DESC",
        (err, data) => {
          !err ? resolve(data) : reject(err);
        }
      );
    });
  },
  getOrdersById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM orders WHERE id = ${id}`, (err, data) => {
        !err ? resolve(data) : reject(err);
      });
    });
  },
};
