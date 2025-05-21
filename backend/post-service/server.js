const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const port = process.env.PORT || 3002;
const Redis = require("ioredis");
const postRoutes = require("./routes/post-route");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorhandler");
const { connectToRabbitMQ } = require("./utils/rabbitmq");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB", error);
  });

const redisClient = new Redis(process.env.REDIS_URL);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());

// HERE I AM PLANING TO ADD RATE LIMITING LATER FOR SOME ROUTE

// routes
app.use(
  "/api/posts",
  (req, res, next) => {
    logger.info("Request received", req.method, req.url);
    req.redisClient = redisClient;
    logger.info("Request body", req.body);

    next();
  },
  postRoutes
);

app.use(errorHandler);

async function start() {
  try {
    await connectToRabbitMQ();
    logger.info("Connected to RabbitMQ");
    app.listen(port, () => {
      logger.info(`Post service running on port ${port}`);
    });
  } catch (error) {
    logger.error("Failed to connect to RabbitMQ and server", error);
    process.exit(1);
  }
}

start();

//unhandled promise rejections

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled promise rejection", reason);
});
