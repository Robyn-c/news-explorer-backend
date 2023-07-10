const express = require('express');
const AuthController = require('../controllers/users');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().trim(true).required()
    })
  }),
  AuthController.login
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().trim(true).required(),
      name: Joi.string().trim(true).min(2).max(30).required()
    })
  }),
  AuthController.createUser
);

module.exports = router;
