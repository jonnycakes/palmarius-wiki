module.exports = {
  showAll(req, res) {
    res.render('articles-index', {
      articles: res.locals.articles,
    });
  },

  showOne(req, res) {
    res.render('article-show', {
      article: res.locals.article,
      editors: res.locals.editors,
    });
  },

  formNew(req, res) {
    res.render('article-create', {
      categories: res.locals.categories,
      authors: res.locals.accounts,
    });
  },

  formEdit(req, res) {
    res.render('article-edit', {
      article: res.locals.article,
      editors: res.locals.accounts,
    });
  },

  destroyRedirect(req, res) {
    res.redirect('/');
  },

};
