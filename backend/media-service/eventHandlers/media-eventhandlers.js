const logger = require("../utils/logger");
const { deleteMediaFromCloudinary } = require("../utils/cloudinary");
const handlePostDeleted = async (message) => {
  try {
    const { postId, userID, mediaUrls } = message;
    logger.info(`Consumed event: ${JSON.stringify(message)}`);
    await deleteMediaFromCloudinary(mediaUrls);
    logger.info(`Deleted media successfully ${mediaUrls}`);
  } catch (error) {
    logger.error("Failed to consume event", error);
  }
};

module.exports = { handlePostDeleted };
