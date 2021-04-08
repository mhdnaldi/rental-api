const {
  postOrders,
  getAllOrders,
  getOrdersById,
} = require("../models/ordersModel");
const { getProductById, updateProducts } = require("../models/productsModel");

module.exports = {
  postOrders: async (req, res) => {
    try {
      const { id, qty, days } = req.body;
      let orderItem = await getProductById(id);
      console.log(orderItem);
      let qtyLeft = orderItem[0].qty;
      // CHECK IF ORDER QTY > VEHICLE QTY
      if (qtyLeft - qty < 0) {
        res.json({
          success: false,
          message: `YOU ORDERING ${qty} VEHICLE BUT IT ONLY HAVE ${qtyLeft} VEHICLE LEFT`,
        });
      } else {
        let data = {
          vehicle_id: id,
          total_price: orderItem[0].rental_price * qty * days,
          total_qty: qty,
          days,
          created_at: new Date(),
        };
        const result = await postOrders(data);
        res.json({
          success: true,
          message: "SUCCESS ORDER VEHICLE",
          data: result,
        });

        const update = {
          qty: qtyLeft - qty,
        };

        // UPDATE VEHICLE QTY
        await updateProducts(update, id);
      }
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const result = await getAllOrders();
      res.json({
        success: true,
        message: "SUCCESS GET ALL ORDERS",
        data: result,
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  },
};