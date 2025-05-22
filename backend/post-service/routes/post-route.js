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
router.delete("/deletePost/:postId", deletePost);
router.put("/updatePost/:postId", updatePost);
router.get("/getPostById/:postId", getPostById);
router.get("/getAllPosts", getAllPosts);
 
module.exports = router;
