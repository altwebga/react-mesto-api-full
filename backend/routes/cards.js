const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../constants/regExp');
const { isValidCardId } = require('../constants/validateMongoId');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).pattern(urlRegExp),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys(isValidCardId).unknown(true),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys(isValidCardId).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys(isValidCardId).unknown(true),
}), dislikeCard);

module.exports = router;
