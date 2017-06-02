const db = require('../config/db.js');

module.exports = {
  findAll() {
    return db.any(`
      SELECT *
      FROM articles
      ORDER BY id DESC
      `);
  },

};
