const { getProductById, getAllProducts } = require("../models/productsModel");

module.exports = {
  getProductById: async (req, res) => {
    try {
      const result = await getProductById(req.params.id);
      return res.json({
        success: true,
        message: "Success get data by id",
        data: result,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err,
      });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const result = await getAllProducts();
      return res.json({
        success: true,
        message: "Success get all data",
        data: result,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err,
      });
    }
  },
};
