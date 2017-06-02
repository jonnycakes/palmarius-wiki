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

  show(req, res, next) {
    Articles.findByArticle(req.params.id)
    .then((article) => {
      res.locals.article = article;
      next();
    })
    .catch(() => res.sendStatus(404));
  },

  getEditors(req, res, next) {
    Articles.findEditors(req.params.id)
    .then((editors) => {
      res.locals.editors = editors;
      next();
    })
    .catch(() => res.sendStatus(404));
  },

};
