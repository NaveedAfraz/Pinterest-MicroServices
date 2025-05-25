const logger = require("../utils/logger");
const {
  uploadMedia,
  deleteMediaFromCloudinary,
} = require("../utils/cloudinary");
const Media = require("../models/media");
const UploadPhoto = async (req, res) => {
  try {
    logger.info(`Media controller called ${JSON.stringify(req.body)}`);
    const { file } = req;
    if (!file) {
      logger.warn("No file uploaded");
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    console.log(`file is this ${req.file}`);

    logger.info(`File uploaded ${file.originalname} ${file.mimetype}`);
    const { originalname, mimetype } = file;
    const { userID } = req.user;
    logger.info(`File Details ${originalname} type = ${mimetype}`);

    const uploadResult = await uploadMedia(file);
    const { public_id, secure_url } = uploadResult;
    logger.info(`Media uploaded successfully ${uploadResult}`);
    const media = await Media.create({
      publicId: public_id,
      originalName: originalname,
      mimeType: mimetype,
      url: secure_url,
      userId: userID,
    });
    return res.status(200).json({ success: true, media });
  } catch (error) {
    logger.warn(error.stack);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePhoto = async (req, res) => {
  try {
    logger.info(`updatephoto controller called ${JSON.stringify(req.body)}`);
    const { file } = req;
    const { mediaId } = req.params;
    if (!file) {
      logger.warn("No file found");
      return res.status(400).json({ success: false, message: "No file found" });
    }
    const media = await Media.findOne({ _id: mediaId });

    if (!media) {
      logger.warn("Media not found");
      return res
        .status(404)
        .json({ success: false, message: "Media not found" });
    }
    await deleteMediaFromCloudinary(media.publicId);
    const uploadResult = await uploadMedia(file);
    const { public_id, secure_url } = uploadResult;
    logger.info(`Media uploaded successfully ${uploadResult}`);
    media.publicId = public_id;
    media.url = secure_url;
    media.originalName = file.originalname;
    media.mimeType = file.mimetype;
    await media.save();
    return res.status(200).json({ success: true, media });
  } catch (error) {
    logger.error(error.stack);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePhoto = async (req, res) => {
  try {
    logger.info(`deletephoto controller called ${JSON.stringify(req.body)}`);
    const { mediaId } = req.params;
    const media = await Media.findOne({ _id: mediaId });
    if (!media) {
      logger.warn("Media not found");
      return res
        .status(404)
        .json({ success: false, message: "Media not found" });
    }
    await deleteMediaFromCloudinary(media.publicId);
    await media.deleteOne();
    return res.status(200).json({ success: true, media });
  } catch (error) {
    logger.error(error.stack);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getMediaById = async (req, res) => {
  try {
    // console.log("=== REQUEST DEBUG ===");
    // console.log("Headers:", req.headers);
    // console.log("Content-Type:", req.headers["content-type"]);
    // console.log("Raw body:", req.body);
    // console.log("Body type:", typeof req.body);
    // console.log("Body keys:", Object.keys(req.body || {}));

    const { mediaIds } = req.body || {};

    // Validate and filter mediaIds
    if (!mediaIds || !Array.isArray(mediaIds)) {
      return res
        .status(400)
        .json({ error: "mediaIds must be a non-empty array" });
    }

    // Filter out invalid IDs (undefined, null, empty strings)
    const validMediaIds = mediaIds.filter((id) => {
      return (
        id != null && id !== "" && typeof id === "string" && id.trim() !== ""
      );
    });
    logger.warn(`Filtered mediaIds: ${validMediaIds.length}`);

    if (validMediaIds.length === 0) {
      return res.status(400).json({ error: "No valid media IDs provided" });
    }

   
    const mediaData = await Media.find({
      _id: { $in: validMediaIds },
    });

    console.log("Found media data:", mediaData);
    logger.warn("Media data result:", mediaData);

    if (mediaData.length === 0) {
      return res
        .status(404)
        .json({ error: "No images found for provided IDs" });
    }

    // Return the media URLs with their IDs for frontend mapping
    const mediaResponse = mediaData.map((media) => ({
      id: media._id,
      url: media.url,
      contentType: media.contentType,
      // Add any other fields you need
    }));

    res.status(200).json({
      success: true,
      data: mediaResponse,
      found: mediaData.length,
      requested: validMediaIds.length,
    });
  } catch (error) {
    console.error("Error serving images:", error);
    logger.error("Error serving images:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid media ID format" });
    }

    res.status(500).json({ error: "Failed to serve images" });
  }
};

module.exports = { UploadPhoto, updatePhoto, deletePhoto, getMediaById };
