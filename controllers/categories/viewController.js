module.exports = {
  showAll(req, res) {
    res.render('category-index', {
      articles: res.locals.categories,
    });
  },

};
