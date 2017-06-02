const db = require('../config/db.js');

module.exports = {
  findAll() {
    return db.many(`
      SELECT articles.id AS id, articles.subject AS subject, articles.created_at AS created_at, accounts.first_name AS first_name, accounts.last_name AS last_name
      FROM articles
      LEFT OUTER JOIN accounts ON (articles.author_id = accounts.id)
      ORDER BY articles.id DESC
      `);
  },

  findByArticle(article_id) {
    return db.one(`
      SELECT *
      FROM articles LEFT OUTER JOIN accounts ON (articles.author_id = accounts.id)
      WHERE articles.id = $1
      `, article_id);
  },

  findEditors(article_id) {
    return db.any(`
      SELECT acc.first_name, acc.last_name, join_table.updated_at
      FROM articles art
      LEFT OUTER JOIN article_contributors join_table ON (art.id = join_table.article_id)
      LEFT OUTER JOIN accounts acc ON (join_table.contributor_id = acc.id)
      WHERE art.id = $1
    `, article_id);
  }


};
