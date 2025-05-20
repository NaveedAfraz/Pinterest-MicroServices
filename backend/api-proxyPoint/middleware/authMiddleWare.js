const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    logger.warn(`Token Not Found ${token}`);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    logger.info("Token Verified", decodedToken);
    req.userID = decodedToken.id;
    logger.info("User ID", req.user);
    next();
  } catch (error) {
    logger.error(`Token Verification Error ${error.stack}`);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
module.exports = validateToken;
