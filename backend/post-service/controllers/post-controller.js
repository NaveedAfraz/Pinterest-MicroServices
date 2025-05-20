const logger = require("../utils/logger");
const Post = require("../models/post");
const { validatePost } = require("../utils/JoiValidtation");
const createPost = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.body)}`);

    const { title, description, mediaUrls, tags } = req.body;

    const { error, value } = validatePost(req.body);
    if (error) {
      logger.warn(`validation error ${error.stack}`);
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }
    const post = await Post.create({
      user: req.user.userID,
      title,
      description,
      mediaUrls: mediaUrls || [],
      tags: tags || [],
    });
    logger.info(`Post created successfully ${post._id}`);
    return res.status(201).json({ success: true, post });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// pending need to complete the rest of the post controller functions
const getAllPosts = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.body)}`);
    const posts = await Post.find();
    logger.info(`get all post successfully ${posts._id}`);
    return res.status(201).json({ success: true, posts });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.body)}`);
    const post = await Post.findById(req.params.id);
    logger.info(`get post by id successfully ${post._id}`);
    return res.status(201).json({ success: true, post });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.body)}`);
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      mediaUrls: req.body.mediaUrls,
      tags: req.body.tags,
    });
    logger.info(`update post successfully ${post._id}`);
    return res.status(201).json({ success: true, post });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.body)}`);
    const post = await Post.findByIdAndDelete(req.params.id);
    logger.info(`delete post successfully ${post._id}`);
    return res.status(201).json({ success: true, post });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getPostById,
};
