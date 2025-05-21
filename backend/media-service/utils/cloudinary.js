const cloudinary = require("cloudinary").v2;
const { UploadStream } = require("cloudinary");
const logger = require("./logger");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMedia = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "Photos",
        resource_type: "auto",
      },
      (err, result) => {
        if (err) {
          logger.error("Upload media error", err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(file.buffer);
  });
};

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info("Delete media successfully", result);
    return result;
  } catch (error) {
    logger.error("Delete media error", error);
    throw error;
  }
};

module.exports = { uploadMedia, deleteMediaFromCloudinary };
