const {
  getProductById,
  getAllProducts,
  postProducts,
  deleteProducts,
  updateProducts,
  getTotalCount,
} = require("../models/productsModel");

module.exports = {
  getProductById: async (req, res) => {
    try {
      const result = await getProductById(req.params.id);
      return res.json({
        success: true,
        message: `SUCCESS GET DATA WITH ID: ${req.params.id}`,
        data: result,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message,
      });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      let { search, page, limit, category } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      let offset = limit * (page - 1);
      const result = await getAllProducts(search, offset, limit, category);
      const total = await getTotalCount(search);
      return res.json({
        success: true,
        message: "SUCCESS GET ALL DATA",
        data: {
          total,
          page,
          limit,
          result: result,
        },
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message,
      });
    }
  },
  postProducts: async (req, res) => {
    try {
      const {
        user_id,
        vehicle_name,
        vehicle_type,
        rental_price,
        qty,
        images,
      } = req.body;
      const data = {
        user_id,
        vehicle_name,
        vehicle_type,
        rental_price,
        qty,
        images,
        created_at: new Date(),
      };
      const result = await postProducts(data);
      return res.json({
        success: true,
        message: "SUCCESS ADD NEW DATA",
        data: result,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message,
      });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      await updateProducts(req.body, id);
      const updatedProduct = await getProductById(id);
      return res.json({
        success: true,
        message: `SUCCESS UPDATE DATA WITH ID: ${id}`,
        data: updatedProduct,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message,
      });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await deleteProducts(id);
      return res.json({
        success: true,
        message: "SUCCESS DELETE DATA",
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message,
      });
    }
  },
};
