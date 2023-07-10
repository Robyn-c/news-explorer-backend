const userRoutes = require('express').Router();

const { getUserInfo } = require('../controllers/users');

userRoutes.get('/users/me', getUserInfo);

module.exports = userRoutes;
