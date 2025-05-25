const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorhandler");
const logger = require("./utils/logger");
const Redis = require("ioredis");
const { connectToRabbitMQ, consumeEvent } = require("./utils/rabbitmq");
const SearchRoutes = require("./routes/search-route");
const {
  handlePostCreated,
  handlePostDeleted,
  handlePostUpdated,
} = require("./eventhandlers/search-event");
app.use(errorHandler);
app.use(express.json());

app.use(helmet());
const redisClient = new Redis(process.env.REDIS_URL);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB", error);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/search", SearchRoutes);

app.use(errorHandler);

async function startServer() {
  try {
    await connectToRabbitMQ();
    await consumeEvent("post_created", handlePostCreated);
    await consumeEvent("post_deleted", handlePostDeleted);
    await consumeEvent("post_updated", handlePostUpdated);
    app.listen(process.env.PORT, () => {
      logger.info(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
  }
}
startServer();
