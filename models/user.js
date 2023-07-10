const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('../utils/validate');
const NotFoundErr = require('../errors/NotFoundErr');
const { reqErrors, validationErrors } = require('../utils/errorMessages');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, validationErrors.email.EMAIL_MESSAGE],
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  }
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(reqErrors.notFound.AUTH_MESSAGE);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotFoundErr(reqErrors.notFound.AUTH_MESSAGE);
        }
        return user;
      });
    })
    .catch();
};

const user = mongoose.model('user', userSchema);
module.exports = user;
