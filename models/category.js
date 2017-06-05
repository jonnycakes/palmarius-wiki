const db = require('../config/db.js');

module.exports = {
  findAllCategories() {
    return db.many(`
      SELECT distinct *
      FROM categories
      ORDER BY categories.description
      `);
  },

  findByCategory(category_id) {
    return db.any(`
      SELECT *
      FROM categories cat
      LEFT OUTER JOIN articles art ON (cat.id = art.category_id)
      WHERE cat.id = $1
      `, category_id);
  },
};
