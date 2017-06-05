const db = require('../config/db.js');

module.exports = {
  findAllCategories() {
    return db.many(`
      SELECT distinct *
      FROM categories
      ORDER BY categories.description
      `);
  },
};
