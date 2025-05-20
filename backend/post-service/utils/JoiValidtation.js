const Joi = require("joi");
const logger = require("./logger");

const validateUser = (data) => {
  logger.info(data);
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().required(),
    mediaUrls: Joi.array().required(),
    tags: Joi.array().required(),
  });

  return schema.validate(data);
};

const validatePost = (data) => {
  logger.info(data);
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().required(),
    mediaUrls: Joi.array().required(),
    tags: Joi.array().required(),
  });

  return schema.validate(data);
};

module.exports = { validateUser, validatePost };
