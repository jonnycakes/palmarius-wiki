module.exports = {
  showAll(req, res) {
    res.render('article-index', {
      hotels: res.locals.hotels,
    });
  },

};
