const db = require('../config/db.js');

module.exports = {
  findAll() {
    return db.many(`
      SELECT articles.id AS id, articles.subject AS subject, articles.created_at AS created_at, accounts.first_name AS first_name, accounts.last_name AS last_name, cat.description, articles.category_id as category_id
      FROM articles
      INNER JOIN accounts ON (articles.author_id = accounts.id)
      INNER JOIN categories cat ON (articles.category_id = cat.id)
      ORDER BY articles.id DESC
      `);
  },

  findByArticle(article_id) {
    return db.one(`
      SELECT art.id AS article_id, art.author_id, art.subject, art.body, art.created_at, art.category_id, acc.id AS account_id, acc.first_name, acc.last_name
      FROM articles art
      INNER JOIN accounts acc ON (art.author_id = acc.id)
      WHERE art.id = $1
      `, article_id);
  },

  findEditors(article_id) {
    return db.any(`
      SELECT acc.first_name, acc.last_name, join_table.updated_at
      FROM articles art
      LEFT OUTER JOIN article_contributors join_table ON (art.id = join_table.article_id)
      LEFT OUTER JOIN accounts acc ON (join_table.contributor_id = acc.id)
      WHERE art.id = $1
      ORDER BY join_table.updated_at DESC
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

   destroyArticleEdits(id) {
    return db.none(`
      DELETE
      FROM article_contributors
      WHERE article_id = $1;
      `, id);
    },


  destroyArticle(id) {
    return db.none(`
      DELETE
      FROM articles
      WHERE id = $1;
      `, id);
  },

  update(article, id) {
    article.id = id;

    return db.one(`
      UPDATE articles
      SET
      subject = $/subject/,
      body = $/body/
      WHERE id = $/id/
      RETURNING *
      `, article);
  },

  createArticleEditor(contributor_id, article_id) {
    return db.none(`
      INSERT INTO article_contributors
      (contributor_id, article_id)
      VALUES
      ($1, $2)
      `, [contributor_id, article_id])
  },

  findAllUpdates() {
    return db.any(`
      SELECT art.id as article_id, art.author_id as author_id, art.subject as subject, j_table.updated_at as updated_at, acc.first_name as first_name, acc.last_name as last_name, acc.nickname as nickname, cat.description as desc
      FROM article_contributors j_table
      LEFT OUTER JOIN articles art ON (j_table.article_id = art.id)
      LEFT OUTER JOIN accounts acc ON (j_table.contributor_id = acc.id)
      LEFT OUTER JOIN categories cat ON (art.category_id = cat.id)
      ORDER BY j_table.updated_at DESC
      `)
  }
};
