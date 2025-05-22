const express = require("express");
const app = express();
const helmet = require("helmet");
const logger = require("./utils/logger");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorhandler");
const port = process.env.PORT || 3003;
const mediaRoutes = require("./routes/media-routes");
const Redis = require("ioredis");
const { connectToRabbitMQ, consumeEvent } = require("./utils/rabbitmq");
const { deleteMediaFromCloudinary } = require("./utils/cloudinary");
const {
  handlePostDeleted,
  handlePostUpdated,
} = require("./eventHandlers/media-eventhandlers");

//mongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB", error);
  });

const redisClient = new Redis(process.env.REDIS_URL);
//cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rate limiting i need to add here in future

//routes
app.use("/api/media", mediaRoutes);

//error handler
app.use(errorHandler);

// consume events
async function start() {
  try {
    await connectToRabbitMQ();
    logger.info("Connected to RabbitMQ");
    //consume all events
    await consumeEvent("post_deleted", handlePostDeleted);
   //await consumeEvent("post_updated", handlePostUpdated);
    app.listen(port, () => {
      logger.info(`Media service running on port ${port}`);
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
