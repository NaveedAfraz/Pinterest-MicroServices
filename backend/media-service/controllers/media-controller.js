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
module.exports = { UploadPhoto, updatePhoto };
