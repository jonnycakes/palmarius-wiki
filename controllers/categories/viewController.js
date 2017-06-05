module.exports = {
  showAll(req, res) {
    res.format({
      json() {
        res.json([res.locals.categories]);
      },
      html() {
        res.render('category-index', {
          articles: res.locals.categories,
        })
      },
    });
  },

  showOne(req, res) {
    res.format({
  json() {
    res.json([res.locals]);
  },
  html() {
    res.render('category-show', {
      articles: res.locals.categories,
    })
  },
});
  },

  formNew(req, res) {
    res.render('category-create');
  },

};
