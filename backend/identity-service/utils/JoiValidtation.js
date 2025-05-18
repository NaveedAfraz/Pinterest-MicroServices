const Joi = require("joi");
const logger = require("./logger");

const validateUser = (data) => {
  logger.info(data);
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
module.exports = { validateUser };
