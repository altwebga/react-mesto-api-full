const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegExp } = require('../constants/regExp');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
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
