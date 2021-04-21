const {
  getProductById,
  getAllProducts,
  postProducts,
  deleteProducts,
  updateProducts,
  getTotalCount,
} = require("../models/productsModel");

const fs = require("fs");

module.exports = {
  getProductById: async (req, res) => {
    try {
      const result = await getProductById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `SUCCESS GET DATA WITH ID: ${req.params.id}`,
        data: result,
      });
    } catch (err) {
      return res.status(404).json({
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
      const total_searching = result.length;
      return res.status(200).json({
        success: true,
        message: "SUCCESS GET ALL DATA",
        data: {
          total,
          total_searching,
          page,
          limit,
          result: result,
        },
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
  postProducts: async (req, res) => {
    try {
      const data = {
        ...req.body,
        images: req.file === undefined ? null : req.file.filename,
      };
      const result = await postProducts(data);
      return res.status(200).json({
        success: true,
        message: "SUCCESS ADD NEW DATA",
        data: result,
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      let images = req.file.filename === undefined ? null : req.file.filename;
      let data = { ...req.body, images: images };
      // console.log(data);
      await updateProducts(data, id);
      const updatedProduct = await getProductById(id);
      const img = updatedProduct[0].images;
      fs.unlink(`uploads/${img}`, (err) => {
        !err ? console.log("ok") : console.log(err);
      });

      return res.status(200).json({
        success: true,
        message: `SUCCESS UPDATE DATA WITH ID: ${id}`,
        data: updatedProduct,
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const { id } = req.params;
      await deleteProducts(id);
      return res.status(200).json({
        success: true,
        message: "SUCCESS DELETE DATA",
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
};
