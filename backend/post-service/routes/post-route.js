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

router.use(authenticateRequest);
router.post("/createPost", createPost);
router.delete("/deletePost/:id", deletePost);
router.put("/updatePost/:id", updatePost);
router.get("/getPostById/:id", getPostById);
router.get("/getAllPosts", getAllPosts);

module.exports = router;
