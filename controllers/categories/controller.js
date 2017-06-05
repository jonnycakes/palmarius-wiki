const Categories = require('../../models/category');

module.exports = {
  index(req, res, next) {
    Categories.findAllCategories()
    .then((categories) => {
      res.locals.categories = categories;
      next();
    })
    .catch(err => next(err));
  },

  show(req, res, next) {
    Categories.findByCategory(req.params.id)
    .then((results) => {
      res.locals.results = results;
      next();
    })
    .catch(() => res.sendStatus(404));
  },

  create(req, res, next) {
    Categories.create(req.body.category)
    .then((category) => {
      console.log(category);
      res.redirect(`/categories/${category.id}`);
    })
    .catch(err => next(err));
  },

};
