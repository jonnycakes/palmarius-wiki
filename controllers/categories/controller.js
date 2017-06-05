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

};
