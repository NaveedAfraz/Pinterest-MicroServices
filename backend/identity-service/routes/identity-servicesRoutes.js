const express = require("express");
const router = express.Router();
const {
  userRegister,
  login,
  refreshToken,
  logout,
} = require("../controllers/identity-controller");
// router.post("/login", (req, res, next) => {
//     console.log("LOGIN route hit");
//     next();
//   });
const validateToken = require("../middleware/authMiddleWare");
const User = require("../models/user");
const logger = require("../utils/logger");

router.get("/me", validateToken, async (req, res) => {
  try {
    // req.userID comes from validateToken
    const user = await User.findById(req.userID).select("username email");
    if (!user) {
      logger.error(`User not found ${user}`);
      return res.status(404).json({ message: "User not found" });
    }
    logger.info(`User found ${user}`);
    return res.status(200).json({ success: true, user });
  } catch (err) {
    logger.error(`User not found ${err.stack}`);
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/register", userRegister);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.post("/logout", logout);

module.exports = router;
