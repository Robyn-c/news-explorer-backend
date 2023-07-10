const indexRoutes = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const newsRoutes = require('./news');
const articleRoutes = require('./articles');
const auth = require('../middlewares/auth');

indexRoutes.use('/', newsRoutes);
indexRoutes.use('/', authRoutes);
indexRoutes.use(auth);
indexRoutes.use('/', userRoutes);
indexRoutes.use('/', articleRoutes);

module.exports = indexRoutes;
