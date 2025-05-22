const logger = require("../utils/logger");
const Search = require("../models/search");

async function handlePostCreated(event) {
  try {
    const { postId, userID, title, description, mediaUrls, tags } = event;
    logger.info(`Post created ${postId}`);
    await Search.create({
      postId,
      userId: userID,
      title,
      description,
      mediaUrls,
      tags,
      createdAt: Date.now(),
    });
    logger.info(
      `Search created successfully ${postId} ${title} ${description} ${mediaUrls} ${tags}`
    );
  } catch (error) {
    logger.error(`Failed to create search ${error.stack}`);
  }
}

async function handlePostDeleted(event) {
  try {
    const { postId, userID } = event;
    logger.info(`Post deleted ${postId}`);
    await Search.deleteOne({ postId });
    logger.info(`Search deleted successfully ${postId} ${userID}`);
  } catch (error) {
    logger.error(`Failed to delete search ${error.stack}`);
  }
}

async function handlePostUpdated(event) {
  try {
    const { postId, title, description, mediaUrls, tags } = event;
    logger.info(`Post updated ${postId}`);
    await Search.updateOne(
      { postId },
      { title, description, mediaUrls, tags, updatedAt: Date.now() }
    );
    logger.info(
      `Search updated successfully ${postId} ${title} ${description} ${mediaUrls} ${tags}`
    );
  } catch (error) {
    logger.error(`Failed to update search ${error.stack}`);
  }
}
module.exports = { handlePostCreated, handlePostDeleted, handlePostUpdated };
