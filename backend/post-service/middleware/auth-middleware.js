const logger = require("../utils/logger");

const authenticateRequest = (req, res, next) => {
  try {
    // const token = req.header('Authorization');
    // if (!token) {
    //     return res.status(401).json({ success: false, message: 'Unauthorized' });
    // }
    // const decodedToken = jwt.verify(token, 'secretKey');
    // req.user = decodedToken;
    // so x-user-id i am getting from the api gate way and this id will be used controller to make the post
    const userID = req.headers["x-user-id"];
    if (!userID) {
      logger.warn(`User ID Not Found ${userID}`);
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }
    req.user = { userID };
    next();
  } catch (error) {
    logger.error(`User ID Not Found ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = authenticateRequest;
