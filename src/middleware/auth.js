const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "INVALID TOKEN",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    }
    req.user = decode;
    return next();
  });
};
