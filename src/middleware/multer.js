const multer = require("multer");

const storage = multer.diskStorage({
  // UPLOAD DESTINATION
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // CHECK IF FILE IS NOT IMAGES TYPE
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
      return cb(new Error("ONLY IMAGES FILES ARE ALLOWED!"), false);
    }
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

let upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
}).single("images");

const uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.json({
        success: false,
        response: err.message.toUpperCase(),
      });
    } else if (err) {
      return res.json({
        success: false,
        response: err.message.toUpperCase(),
      });
    }
    next();
  });
};

module.exports = uploadFile;
