const logger = require("../utils/logger");
const { deleteMediaFromCloudinary } = require("../utils/cloudinary");
const Post = require("../../post-service/models/post");
const Media = require("../models/media");
const handlePostDeleted = async (message) => {
  try {
    const { postId, userID, mediaUrls } = message;
    logger.info(`Consumed event: ${JSON.stringify(message)}`);
    //const mediaToDelete = await Post.findById(postId);
    const mediaToDelete = await Media.find({ _id: { $in: mediaUrls } });

    for (const media of mediaToDelete) {
      await deleteMediaFromCloudinary(media.publicId); // deletes frm the the cloud
      await Media.findByIdAndDelete(media._id); // deletes frm the db
      logger.info(`Deleted media successfully ${media}`);
    }
    logger.info(`Deleted media successfully ${mediaToDelete}`);
  } catch (error) {
    logger.error("Failed to consume event", error);
  }
};

module.exports = { handlePostDeleted };
