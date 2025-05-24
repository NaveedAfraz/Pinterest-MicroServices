const express = require("express");
const router = express.Router();
const multer = require("multer");
const logger = require("../utils/logger");
const {
  UploadPhoto,
  updatePhoto,
  deletePhoto,
  getMediaById,
} = require("../controllers/media-controller");
const { authenticateRequest } = require("../middleware/auth-middleware");


router.get("/image/:mediaId", authenticateRequest, getMediaById);

//multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("file");

router.post(
  "/upload",
  authenticateRequest,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        logger.error("Upload media error", err);
        return res
          .status(500)
          .json({ success: false, message: err.message, stack: err.stack });
      } else if (err) {
        logger.error("Upload media error", err);
        return res
          .status(500)
          .json({ success: false, message: err.message, stack: err.stack });
      }

      if (!req.file) {
        logger.error("No file found");
        return res
          .status(400)
          .json({ success: false, message: "No file found" });
      }

      // ✅ Log file info here after multer has set req.file
      logger.info(`Upload media: ${JSON.stringify(req.file, null, 2)}`);

      next();
    });
  },
  UploadPhoto
);

router.put(
  "/update/:mediaId",
  authenticateRequest,
  (req, res, next) => {
    logger.info("Update media");
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        logger.error("Update media error", err);
        return res
          .status(500)
          .json({ success: false, message: err.message, stack: err.stack });
      } else if (err) {
        logger.error("Update media error", err);
        return res
          .status(500)
          .json({ success: false, message: err.message, stack: err.stack });
      }

      if (!req.file) {
        logger.error("No file found");
        return res
          .status(400)
          .json({ success: false, message: "No file found" });
      }
      next();
    });
  },
  updatePhoto
);
router.delete("/delete/:mediaId", authenticateRequest, deletePhoto);

module.exports = router;
