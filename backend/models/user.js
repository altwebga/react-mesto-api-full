const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError401');
const { urlPattern } = require('../pattern/urlPattern');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Имя должно быть длиннее 2х символов, текущая длина {VALUE}'],
      maxlength: [30, 'Имя должно быть короче 30ти символов, текущая длина {VALUE}'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Описание должно быть длиннее 2х символов, текущая длина {VALUE}'],
      maxlength: [30, 'Описание должно быть короче 30ти символов, текущая длина {VALUE}'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator(url) {
          return urlPattern.test(url);
        },
        message: 'Некорректный url',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Некорректный Email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('401 - Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('401 - Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
