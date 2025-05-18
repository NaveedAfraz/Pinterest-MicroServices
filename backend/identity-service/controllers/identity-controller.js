const logger = require("../utils/logger");
const { validateUser } = require("../utils/JoiValidtation");
const User = require("../models/user");
// user reg
const userRegister = async (req, res) => {
  logger.info("User Register controller called");
  try {
    const { error, value } = validateUser(req.body);
    if (error) {
      logger.warn("validation error", error.stack);
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }
    if (value) {
      const { username, email, password } = req.body;

      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        logger.warn("User Already Exists", user);
        return res.status(400).json({
          message: "User already exists",
          success: false,
        });
      }

      //   const createUser = await User.create({
      //     username,
      //     email,
      //     password,
      //   });
      const createUser = new User({ username, email, password });
      await createUser.save();
      logger.info("User registered successfully", createUser._id);
      return res.status(201).json({
        message: "User registered successfully",
        success: true,
        createUser,
      });
    }
  } catch (error) {
    logger.error("User Register error", error.stack);
    return res.status(500).json({ message: error.message });
  }
};

//user login

// refresh token

//logout
module.exports = { userRegister };
