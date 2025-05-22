const express = require("express");
const { searchPostController } = require("../controllers/search-controller");
const router = express.Router();

router.get("/searchPosts", searchPostController);

module.exports = router;
