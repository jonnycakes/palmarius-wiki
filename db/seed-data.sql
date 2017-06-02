-- RUN WITH COMMAND `psql palmarius_wiki_db < seed-data.sql `

-- remove any records and start the id sequence back to 1
TRUNCATE TABLE tags CASCADE;
TRUNCATE TABLE accounts CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE articles CASCADE;
TRUNCATE TABLE article_contributors CASCADE;
TRUNCATE TABLE article_tags CASCADE;


-- create tables
INSERT INTO tags
  (description)
VALUES
  ('Default'),
  ('HTML'),
  ('CSS'),
  ('Vanilla Javascript'),
  ('Node.js'),
  ('Rails'),
  ('Administration'),
  ('Text Editors'),
  ('JQuery');


INSERT INTO categories
  (description)
VALUES
  ('Default'),
  ('HTML'),
  ('CSS'),
  ('Vanilla Javascript'),
  ('Node.js'),
  ('Rails'),
  ('Administration'),
  ('Text Editors'),
  ('JQuery');

INSERT INTO accounts
  (first_name, last_name, nickname)
VALUES
  ('Joe', 'Schmoe', 'Default'),
  ('Mark', 'Ledbetter', 'The Legend'),
  ('John', 'Farrelly', ''),
  ('Arun', 'Sood', ''),
  ('Matt', 'Gershowitz', ''),
  ('Troy', 'Cook', ''),
  ('Thiago', 'Brandao', ''),
  ('Jason', 'Seminara', ''),
  ('Celine', 'Chadwick', ''),
  ('Diane', 'Carlton', ''),
  ('Tom', 'Docu', ''),
  ('Julia', 'Kim', ''),
  ('Spencer', 'Balkin', ''),
  ('Kevin', 'Xu', '');

INSERT INTO articles
  (author_id, subject, body, category_id)
VALUES
  ('1', 'Hello World', 'This is some body text', 1),
  ('1', 'Foo Bar', 'This is some body text', 1),
  ('1', 'Placeholder', 'This is some body text', 1);

INSERT INTO article_contributors
  (article_id, contributor_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (1, 4),
  (1, 5),
  (2, 6);

INSERT INTO article_tags
  (article_id, tag_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3);

-- Reset sequence num for tables with primary keys
ALTER SEQUENCE tags_id_seq RESTART WITH 10;
ALTER SEQUENCE accounts_id_seq RESTART WITH 14;
ALTER SEQUENCE categories_id_seq RESTART WITH 10;
ALTER SEQUENCE articles_id_seq RESTART WITH 4;
ALTER SEQUENCE article_contributors_id_seq RESTART WITH 7;
