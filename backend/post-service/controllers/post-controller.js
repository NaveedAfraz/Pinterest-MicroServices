const logger = require("../utils/logger");
const Post = require("../models/post");
const { validatePost } = require("../utils/JoiValidtation");
const { publishEvent } = require("../utils/rabbitmq");

// async function invaildateCache(req, input) {
//   const cacheKey = `posts:${input}`;
//   await req.redisClient.del(cacheKey);
//   const keys = await req.redisClient.keys("posts:*");
//   if (keys.length > 0) {
//     await req.redisClient.del(keys);
//   }
// }

async function invalidateCache(req, postId = null) {
  try {
    // Delete all paginated post lists
    const listKeys = await req.redisClient.keys("posts_*");
    if (listKeys.length > 0) {
      await req.redisClient.del(listKeys);
    }

    // Delete single post cache (if applicable)
    if (postId) {
      const postKey = `post_${postId}`;
      await req.redisClient.del(postKey);
    }
  } catch (error) {
    console.error("Failed to invalidate cache", error);
  }
}

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

    await publishEvent("post_created", {
      postId: post._id.toString(),
      userID: req.user.userID,
      title: post.title,
      description: post.description,
      mediaUrls: post.mediaUrls,
      tags: post.tags,
      createdAt: post.createdAt || Date.now(),
    });

    logger.info(`Post created successfully ${post._id}`);
    await invalidateCache(req, post._id);
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

    const cacheKey = `posts_${req.query.skip}_${req.query.limit}`;
    const cachedPosts = await req.redisClient.get(cacheKey);

    if (cachedPosts) {
      logger.info(`Posts found in cache ${cachedPosts}`);
      return res
        .status(201)
        .json({ success: true, posts: JSON.parse(cachedPosts) });
    }

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    logger.info(`get all post successfully ${posts._id}`);
    await req.redisClient.setex(cacheKey, 120, JSON.stringify(posts));
    return res.status(201).json({ success: true, posts, skip, limit });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.params.postId)}`);

    const cacheKey = `post_${req.params.postId}`;
    const cachedPost = await req.redisClient.get(cacheKey);
    if (cachedPost) {
      logger.info(`Post found in cache ${cachedPost}`);
      return res
        .status(201)
        .json({ success: true, post: JSON.parse(cachedPost) });
    }
    const post = await Post.findById(req.params.postId);
    if (!post) {
      logger.error(`Post not found ${req.params.postId}`);
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    logger.info(`get post by id successfully ${post._id}`);
    await req.redisClient.setex(cacheKey, 120, JSON.stringify(post));
    return res.status(201).json({ success: true, post });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.body)}`);
    const post = await Post.findByIdAndUpdate(req.params.postId, {
      title: req.body.title,
      description: req.body.description,
      mediaUrls: req.body.mediaUrls,
      tags: req.body.tags,
    });
    logger.info(`update post successfully ${post._id}`);
    // await invaildateCache(req, "posts:*");
    return res.status(201).json({ success: true, post });
  } catch (error) {
    logger.error(`Post controller error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    logger.info(`Post controller called ${JSON.stringify(req.params.postId)}`);
    const post = await Post.findOneAndDelete({
      _id: req.params.postId,
      user: req.user.userID,
    });
    if (!post) {
      logger.error(`Post not found ${req.params.postId}`);
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // publich event
    await publishEvent("post_deleted", {
      postId: post._id.toString(),
      userID: req.user.userID,
      mediaUrls: post.mediaUrls,
    });

    logger.info(`delete post successfully ${post._id}`);
    await invalidateCache(req, post._id); // deletes both post_123 and posts_*

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
