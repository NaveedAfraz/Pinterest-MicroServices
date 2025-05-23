const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  // Debug logging
  logger.info('=== validateToken Debug ===');
  logger.info('Raw cookie header:', req.headers.cookie);
  logger.info('Parsed cookies object:', req.cookies);
  logger.info('Cookie keys:', req.cookies ? Object.keys(req.cookies) : 'undefined');
  logger.info('Authorization header:', req.headers.authorization);
  
  // Try Authorization header first
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // Fall back to httpOnly cookie named "accessToken"
  if (!token && req.cookies) {
    token = req.cookies.accessToken;
    logger.info('Token from accessToken cookie:', token);
  }

  // Also try refreshToken as backup
  if (!token && req.cookies && req.cookies.refreshToken) {
    logger.info('No accessToken, but found refreshToken:', req.cookies.refreshToken);
  }

  logger.info(`Final token: ${token}`);

  if (!token) {
    logger.warn(`Token Not Found`);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.info("Token Verified", decoded);
    req.userID = decoded.id;
    next();
  } catch (err) {
    logger.error(`Token Verification Error ${err.stack}`);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = validateToken;
