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

  getAllAccounts(req, res, next) {
    Articles.findAllAccounts()
    .then((accounts) => {
      res.locals.accounts = accounts;
      next();
    })
    .catch(() => {
      console.log("Went wrong in getAllAccounts");
      res.sendStatus(404)
    });
  },

  getAllCategories(req, res, next) {
    Articles.findAllCategories()
    .then((categories) => {
      res.locals.categories = categories;
      next();
    })
    .catch(() => res.sendStatus(404));
  },

  create(req, res, next) {
    console.log(req.body.article);
    Articles.create(req.body.article)
    .then((article) => {
      res.redirect(`${article.id}`);
    })
    .catch(err => next(err));
  },

  getOneArticle(req, res, next) {
    console.log(req.params.id);
    Articles.findById(req.params.id)
    .then((article) => {
      res.locals.article = article;
      next();
    })
    .catch(() => {
      console.log("Went wrong in getOneArticle"); // leaving this here cause this woked to trobuleshoot!
      res.sendStatus(404)
    });
  },

  destroyArticleEdits(req, res, next) {
    Articles.destroyArticleEdits(req.params.id)
    .then((article) => {
      res.locals.article = article;
      next();
    })
    .catch(err => next(err));
  },

  destroyArticle(req, res, next) {
    Articles.destroyArticle(req.params.id)
    .then((article) => {
      res.locals.article = article;
      next();
    })
    .catch(err => next(err));
  },

  update(req, res, next) {
    Articles.update(req.body.article, req.params.id)
    .then( () => {;
      next();
    })
    .catch(err => next(err));
  },

  createArticleEditor(req, res, next) {
    Articles.createArticleEditor(req.body.article.contributor_id, req.params.id)
    .then((output) => {
      console.log(output);
      next();
    })
    .catch(err => next(err));
  },

  getUpdateHistory(req, res, next) {
    Articles.findAllUpdates()
      .then((updates) => {
        res.locals.updates = updates;
        next();
      })
      .catch(err => next(err));
    },
};
