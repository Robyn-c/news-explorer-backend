const mongoose = require('mongoose');
const { isUrl } = require('../utils/validate');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');
const { reqErrors, validationErrors } = require('../utils/errorMessages');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: [isUrl, validationErrors.url.LINK_MESSAGE]
  },
  image: {
    type: String,
    required: true,
    validate: [isUrl, validationErrors.url.IMAGE_MESSAGE]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false
  }
});

articleSchema.statics.ownerArticleDeletion = function del(articleId, ownerId) {
  return this.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundErr(reqErrors.notFound.ARTICLE_MESSAGE);
      }
      if (article.owner.toString() !== ownerId) {
        throw new ForbiddenErr(reqErrors.forbidden.ARTICLE_MESSAGE);
      }
      return article.remove();
    })
    .catch();
};

const article = mongoose.model('article', articleSchema);

module.exports = article;
