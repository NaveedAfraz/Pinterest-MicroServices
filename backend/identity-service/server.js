const express = require("express");
const app = express();
const logger = require("./utils/logger");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const helmet = require("helmet");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const routes = require("./routes/identity-servicesRoutes");
const Redis = require("ioredis");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//mongoDB and redis connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB", error);
  });

const redisClient = new Redis(process.env.REDIS_URL); // defaults to localhost:6379

redisClient.on("connect", () => {
  console.log("Connected to Redis Cloud");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});
//middlewares

//cors
app.use(
  cors({
    origin: [
      "https://pinterest-micro-services-81kr.vercel.app/",
      "https://pinterest-microservices-web.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use((req, res, next) => {
  logger.info("Request received", req.method, req.url);
  logger.info("Request body", req.body);
  //logger.info("Request headers", req.headers);
  next();
});

// denial of service (dos) protection and rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 190, //  120 requests in this below duration
  duration: 1,
});

// this blocks the ip if too many requests are done
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({ success: false, message: "Too many requests" });
    });
});

//Ip based rate limiting middleware for sensitive endpoints
const sensitiveRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  handler: (req, res, next) => {
    console.log("err");

    logger.warn("sestive endpoint rate limit exceeded for IP", req.ip);
    return res
      .status(429)
      .json({ message: "Too many requests", success: false });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

//these endpoints will be sensitive rate limited
app.use("/api/auth/register", sensitiveRateLimit);

app.use("/api/auth", routes);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});

//unhandled promise rejections

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled promise rejection", reason);
});
