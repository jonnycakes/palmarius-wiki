const Articles = require('../../models/article');

module.exports = {
  index(req, res, next) {
    Articles.findAll()
    .then((articles) => {
      res.locals.articles = articles;
      next();
    })
    .catch(err => next(err));
  },

};
