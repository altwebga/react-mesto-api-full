const Card = require('../models/card');
const { BadRequestError } = require('../constants/BadRequestError');
const { NotFoundError } = require('../constants/NotFoundError');
const { ForbiddenError } = require('../constants/ForbiddenError');
const {
  CREATED_CODE,
} = require('../constants/codes');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards.reverse() }))
    .catch(next);
};

module.exports.createCard = async (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner });
    return res.status(CREATED_CODE).send({ data: card });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные для создания карточки'));
    }
    return next(error);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const owner = req.user._id;

    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    if (card.owner.toString() !== owner) {
      throw new ForbiddenError('Не достаточно прав для удаления');
    }

    await card.remove();

    return res.send({ message: 'Карточка удалена успешно' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return next(new BadRequestError('Неверный формат ID'));
    }
    return next(error);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    return res.send({ data: card });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return next(new BadRequestError('Неверный формат ID'));
    }
    return next(error);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    return res.send({ data: card });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return next(new BadRequestError('Неверный формат ID'));
    }
    return next(error);
  }
};
