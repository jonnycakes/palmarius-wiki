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

};
