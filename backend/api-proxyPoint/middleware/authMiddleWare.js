const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  // Try Authorization header first…
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // …otherwise fall back to httpOnly cookie named "accessToken"
  if (!token && req.cookies) {
    token = req.cookies.accessToken;
  }

  logger.info(`Token from header/cookie: ${token}, authHeader: ${authHeader}`);

  if (!token) {
    logger.warn(`Token Not Found`);
    return res.status(401).json({ success: false, message: "Unauthorized.." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info("Token Verified", decoded);

    // Attach the user ID for downstream handlers
    req.userID = decoded.id;
    next();
  } catch (err) {
    logger.error(`Token Verification Error ${err.stack}`);
    return res.status(401).json({ success: false, message: "Unauthorized.." });
  }
};

module.exports = validateToken;
