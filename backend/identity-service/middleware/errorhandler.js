const logger = require("../utils/logger");

const errorHandler = (req, res, next, error) => {
  logger.error(error.stack);

  return res.status(500).json({ message: error.message });
};

module.exports = errorHandler;
