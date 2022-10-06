const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegExp } = require('../constants/regExp');

const userSchema = new mongoose.Schema({
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
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
      message: (props) => `${props.value} - не верный формат`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Ошибки в E-mail'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
