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
router.post("/register", userRegister);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.post("/logout", logout);
module.exports = router;
