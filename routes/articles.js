const articleRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getSavedArticles,
  postArticle,
  deleteSavedArticle,
  verifyArticle,
} = require('../controllers/articles');

articleRoutes.get('/articles', getSavedArticles);

articleRoutes.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
    }),
  }),
  postArticle,
);

articleRoutes.delete(
  '/articles/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }),
  }),
  deleteSavedArticle,
);

articleRoutes.post(
  '/articles/compare',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
    }),
  }),
  verifyArticle,
);

module.exports = articleRoutes;
