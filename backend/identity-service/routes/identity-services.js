const express = require("express");
const router = express.Router();
const { userRegister } = require("../controllers/identity-controller");

router.post("/register", userRegister);

module.exports = router;
