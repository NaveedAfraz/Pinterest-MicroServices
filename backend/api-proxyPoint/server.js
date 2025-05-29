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
const validateToken = require("./middleware/authMiddleWare");
const cookieParser = require("cookie-parser");
//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () => {
  console.log("Connected to Redis Cloud");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});
//rateLimiting
const RateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1200,
  standardHeaders: true,

  handler: (req, res, next) => {
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
    const newPath = req.originalUrl.replace(/^\/v1/, "/api");
    logger.info(`Proxy forwarding to path: ${newPath}`);
    return newPath;
  },
  proxyErrorHandler: (err, res, next) => {
    logger.error("Proxy error", err);
    return res.status(500).json({ message: "Proxy error", success: false });
  },
};

//setup of rediret to identity service
app.use(
  "/v1/auth",
  proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpt, srcReq) => {
      proxyReqOpt.headers["Content-Type"] = "application/json";
      // Forward cookies from incoming request (port 3000) to target service (port 3001)
      if (srcReq.headers.cookie) {
        proxyReqOpt.headers["Cookie"] = srcReq.headers.cookie;
        logger.info(`Forwarding cookies: ${srcReq.headers.cookie}`);
      }
      return proxyReqOpt;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(`Response received ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

app.use(
  "/v1/posts",
  validateToken,// middleware to validate token
  proxy(process.env.POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpt, srcReq) => {
      logger.info(`User ID ${srcReq.userID}`);
      proxyReqOpt.headers["Content-Type"] = "application/json";

      if (srcReq.headers.cookie) {
        proxyReqOpt.headers["Cookie"] = srcReq.headers.cookie;
      }
      if (srcReq.userID) {
        proxyReqOpt.headers["x-user-id"] = srcReq.userID;
      }
      return proxyReqOpt;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(`Response received ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// app.use(
//   "/v1/media",
//   validateToken,
//   proxy(process.env.MEDIA_SERVICE_URL, {
//     ...proxyOptions,
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       logger.info(`User ID ${srcReq.userID}`);
//       logger.info(`Content-Type ${srcReq.headers["content-type"]}`);
//       proxyReqOpts.headers["x-user-id"] = srcReq.userID;
//       if (!srcReq.headers["content-type"].startsWith("multipart/form-data")) {
//         proxyReqOpts.headers["Content-Type"] = "application/json";
//       }

//       return proxyReqOpts;
//     },
//     userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
//       logger.info(
//         `Response received from media service: ${proxyRes.statusCode}`
//       );

//       return proxyResData;
//     },
//     parseReqBody: false,
//   })
// );

app.use(
  "/v1/media",
  validateToken,
  proxy(process.env.MEDIA_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      logger.info(`User ID ${srcReq.userID}`);
      logger.info(`Content-Type ${srcReq.headers["content-type"]}`);

      // Forward cookies
      if (srcReq.headers.cookie) {
        proxyReqOpts.headers["Cookie"] = srcReq.headers.cookie;
      }

      // Add user ID header
      if (srcReq.userID) {
        proxyReqOpts.headers["x-user-id"] = srcReq.userID;
      }

      // Set content type conditionally
      if (
        srcReq.headers["content-type"] &&
        !srcReq.headers["content-type"].startsWith("multipart/form-data")
      ) {
        proxyReqOpts.headers["Content-Type"] = "application/json";
      }

      return proxyReqOpts;
    },

    userResHeaderDecorator(headers, userReq, userRes, proxyRes) {
      // Add safety checks
      if (!proxyRes) {
        logger.warn("proxyRes is undefined in userResHeaderDecorator");
        return headers;
      }

      if (!proxyRes.headers) {
        logger.warn("proxyRes.headers is undefined in userResHeaderDecorator");
        return headers;
      }

      // Forward set-cookie headers if they exist
      const setCookie = proxyRes.headers["set-cookie"];
      if (setCookie) {
        headers["set-cookie"] = setCookie;
        logger.info("Forwarded set-cookie headers from proxied service");
      }

      return headers;
    },

    // Add error handling
    onError: (err, req, res) => {
      logger.error("Proxy error:", err);
      res.status(500).json({
        error: "Internal server error",
        message: "Proxy request failed",
      });
    },

    // Add response interceptor for better debugging
    onProxyRes: (proxyRes, req, res) => {
      logger.info(`Proxy response status: ${proxyRes.statusCode}`);
      logger.info(`Proxy response headers:`, proxyRes.headers);
    },

    parseReqBody: true,
  })
);

app.use(
  "/v1/search",
  proxy(process.env.SEARCH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpt, srcReq) => {
      logger.info(`User ID ${srcReq.userID}`);

      proxyReqOpt.headers["Content-Type"] = "application/json";
      if (srcReq.userID) {
        proxyReqOpt.headers["x-user-id"] = srcReq.userID;
      }
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
  logger.info(`post Server is running on port ${process.env.POST_SERVICE_URL}`);
  logger.info(
    `media Server is running on port ${process.env.MEDIA_SERVICE_URL}`
  );
  logger.info(
    `search Server is running on port ${process.env.SEARCH_SERVICE_URL}`
  );
  logger.info(`Server is running on port ${process.env.PORT}`);
  logger.info(`redis is working ${process.env.REDIS_URL}`);
});
