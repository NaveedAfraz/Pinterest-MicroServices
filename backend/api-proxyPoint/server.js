const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const proxy = require("express-http-proxy");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const Redis = require("ioredis");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorhandler");
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

const redisClient = new Redis(process.env.REDIS_URL);

//rateLimiting
const RateLimit = rateLimit({
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

//middlewares
app.use(RateLimit);
app.use((req, res, next) => {
  logger.info("Request received", req.method, req.url);
  logger.info("Request body", req.body);
  //logger.info("Request headers", req.headers);
  next();
});

// apiProxy -> /v1/auth/register -> 3000  (first then re directs to 3001)
// -> identity -> api/auth/register -> 3001

// http://localhost:3000/v1/auth/register -> http://localhost:3001/api/auth/register

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err, req, res, next) => {
    logger.error("Proxy error", err);
    res.status(500).json({ message: "Proxy error", success: false });
  },
};

//setup of rediret to identity service
app.use(
  "/v1/auth",
  proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpt, srcReq) => {
      proxyReqOpt.headers["Content-Type"] = "application/json";
      return proxyReqOpt;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(`Response received ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  logger.info(
    `identity Server is running on port ${process.env.IDENTITY_SERVICE_URL}`
  );
  logger.info(`Server is running on port ${process.env.PORT}`);
  logger.info(`redis is working ${process.env.REDIS_URL}`);
});
