const newsRoutes = require('express').Router();
const { getNews } = require('../utils/newsApi');

newsRoutes.get('/get-news', getNews);

module.exports = newsRoutes;
