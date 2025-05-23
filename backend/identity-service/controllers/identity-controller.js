const logger = require("../utils/logger");
const { validateUser, validateLogin } = require("../utils/JoiValidtation");
const User = require("../models/user");
const { genarateToken } = require("../utils/genarateToken");
const RefreshToken = require("../models/refreshToken");
//const path = require("path");
// user reg
const userRegister = async (req, res) => {
  logger.info(`User Register controller called ${JSON.stringify(req.body)}`);
  try {
    const { error, value } = validateUser(req.body);
    if (error) {
      logger.warn(`validation error ${error.stack}`);
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }
    if (value) {
      logger.info(`User Register controller called ${JSON.stringify(value)}`);
      const { username, email, password } = req.body;

      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        logger.warn(`User Already Exists ${user}`);
        return res.status(400).json({
          message: "User already exists",
          success: false,
        });
      }

      const createUser = await User.create({
        username,
        email,
        password,
      });

      logger.info(`User registered successfully ${createUser._id}`);
      const { accessToken, refreshToken } = await genarateToken(createUser);
      return res.status(201).json({
        message: "User registered successfully",
        success: true,
        createUser,
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    logger.error(`User Register error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//user login
const login = async (req, res) => {
  logger.info(`User Login controller called ${JSON.stringify(req.body)}`);
  try {
    const { error, value } = validateLogin(req.body);
    if (error) {
      logger.info(`User Login controller called ${JSON.stringify(value)}`);
      logger.warn(`validation error ${error.stack}`);
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }
    if (value) {
      // logger.info(`User Login controller called ${JSON.stringify(value)}`);
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        logger.warn(`User Not Found ${email}`);
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }
      logger.info(`User found ${user}`);
      //PASSIGN TO THE MIDDLERWARE WHICH IS IN HE MODEL TO COMAPRE THE PASSWORD
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        logger.warn(`User Not Found ${email}`);
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }
      const { accessToken, refreshToken } = await genarateToken(user);
      logger.info(`accessToken of login ${accessToken}`);
      logger.info(`refreshToken of login ${refreshToken}`);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 20 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (error) {
    logger.error(`User Login error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// refresh token
const refreshToken = async (req, res) => {
  try {
    logger.info(`Refresh Token controller called ${JSON.stringify(req.body)}`);
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn(`Refresh Token Not Found ${refreshToken}`);
      return res.status(400).json({
        message: "Refresh Token Not Found",
        success: false,
      });
    }
    const token = await RefreshToken.findOne({ token: refreshToken });

    if (token.expiresAt < Date.now() || !token) {
      logger.warn(`Token Expired ${token}`);
      return res.status(401).json({
        message: "Token Expired",
        success: false,
      });
    }
    const user = await User.findById(token.user);
    if (!user) {
      logger.warn(`User Not Found ${user}`);
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await genarateToken(user);
    logger.info(`newAccessToken ${newAccessToken}`);
    logger.info(`newRefreshToken ${newRefreshToken}`);
    await RefreshToken.deleteOne({ _id: token._id });
    // need to add the token in the db later will do

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    logger.error(`Refresh Token error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
//logout
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn(`Refresh Token Not Found ${refreshToken}`);
      return res.status(400).json({
        message: "Refresh Token Not Found",
        success: false,
      });
    }
    const token = await RefreshToken.findOne({ token: refreshToken });
    if (!token) {
      logger.warn(`Token Not Found ${refreshToken}`);
      return res.status(400).json({
        message: "Token Not Found",
        success: false,
      });
    }
    await RefreshToken.deleteOne({ _id: token._id });
    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    logger.error(`Logout error ${error.stack}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { userRegister, login, refreshToken, logout };
