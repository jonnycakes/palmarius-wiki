module.exports = {
  showAll(req, res) {
    res.render('category-index', {
      articles: res.locals.categories,
    });
  },

  showOne(req, res) {
    res.render('category-show', {
      articles: res.locals.categories,
    });
  },

  formNew(req, res) {
    res.render('category-create');
  },

};
