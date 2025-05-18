const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const validateUser = (user) => {
  const { error, value } = userSchema.validate(user);
  if (error) {
    throw error;
  }
  return value;
};

module.exports = { validateUser };
