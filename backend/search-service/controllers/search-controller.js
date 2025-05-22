const logger = require("../utils/logger");
const Search = require("../models/search");
const searchPostController = async (req, res) => {
  try {
    logger.info(`Search controller called ${JSON.stringify(req.query)}`);
    const { query } = req.query;
    if (!query) {
      logger.warn("Query parameter is missing");
      return res
        .status(400)
        .json({ success: false, message: "Query parameter is missing" });
    }
    const searchResults = await Search.find({
      title: { $regex: query, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .limit(10);
    if (searchResults.length == 0) {
      logger.warn("No search results found");
      return res
        .status(404)
        .json({ success: false, message: "No search results found" });
    }
    return res.status(200).json({ success: true, searchResults });
  } catch (error) {
    logger.error(error.stack);
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { searchPostController };
