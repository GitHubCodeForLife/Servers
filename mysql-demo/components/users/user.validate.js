// Validate.js
const Joi = require("@hapi/joi");

const validateRegister = (data) => {
  const user = {
    name: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  };

  return Joi.validate(data, user);
};

const validateLogin = (data) => {
  const user = {
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  };

  return Joi.validate(data, user);
};

module.exports = {
  validateRegister,
  validateLogin,
};
