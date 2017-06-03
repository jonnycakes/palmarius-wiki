const db = require('../config/db.js');

module.exports = {
  findAll() {
    return db.many(`
      SELECT articles.id AS id, articles.subject AS subject, articles.created_at AS created_at, accounts.first_name AS first_name, accounts.last_name AS last_name, cat.description
      FROM articles
      INNER JOIN accounts ON (articles.author_id = accounts.id)
      INNER JOIN categories cat ON (articles.category_id = cat.id)
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
  },

  findOneCategory(article_id) {
    return db.one(`
      SELECT cat.description
      FROM articles art
      INNER JOIN categories cat ON (art.category_id = cat.id)
      WHERE art.id = $1
    `, article_id)
  },

  findAllCategories() {
    return db.many(`
      SELECT cat.description, cat.id
      FROM categories cat
    `)
  },

  findAllAccounts() {
    return db.many(`
      SELECT first_name, last_name, nickname, id
      FROM accounts
    `)
  },

  create(article) {
  return db.one(`
     INSERT INTO articles (
       author_id,
       subject,
       body,
       category_id
     ) VALUES (
       $/author_id/,
       $/subject/,
       $/body/,
       $/category_id/
     )
     RETURNING id
   `, article);
   },

   findById(id) {
     return db.one(`
       SELECT art.id, art.subject, art.body, cat.description
       FROM articles art
       INNER JOIN categories cat ON (art.category_id = cat.id)
       WHERE art.id = $1
       `, id);
     },

   destroy(id) {
    return db.none(`
      DELETE
      FROM articles
      WHERE id = $1;
      `, id);
  },

};
