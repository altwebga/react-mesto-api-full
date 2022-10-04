const mongoose = require('mongoose');
const { Joi } = require('celebrate');

const validateId = (value, helpers) => {
  if (!mongoose.isObjectIdOrHexString(value)) {
    return helpers.message('Некорректный формат ID');
  }

  return value;
};

const isValidUserId = {
  userId: Joi.string().alphanum().length(24).custom(validateId, 'ObjectID validation'),
};

const isValidCardId = {
  cardId: Joi.string().alphanum().length(24).custom(validateId, 'ObjectID validation'),
};

module.exports = {
  isValidUserId,
  isValidCardId,
};
