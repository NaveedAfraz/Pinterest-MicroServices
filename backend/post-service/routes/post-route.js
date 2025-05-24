const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  updatePost,
  getPostById,
  getAllPosts,
} = require("../controllers/post-controller");
const authenticateRequest = require("../middleware/auth-middleware");
router.get("/getPostById/:postId", getPostById);
router.get("/getAllPosts", getAllPosts);

router.post("/createPost", authenticateRequest, createPost);
router.delete("/deletePost/:postId", authenticateRequest, deletePost);
router.put("/updatePost/:postId", authenticateRequest, updatePost);

module.exports = router;
