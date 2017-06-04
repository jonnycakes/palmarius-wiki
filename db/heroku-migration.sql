-- RUN WITH COMMAND `heroku pg:psql --app palmarius-wiki < heroku-migration.sql`
-- USE THIS ONLY TO CREATE DATABASE SCHEMA FOR HEROKU

DROP TABLE IF EXISTS article_contributors CASCADE;
DROP TABLE IF EXISTS article_tags CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS articles CASCADE;


CREATE TABLE tags (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR (255) NOT NULL
);

CREATE TABLE accounts (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR (128) NOT NULL,
  last_name VARCHAR (128) NOT NULL,
  nickname VARCHAR (128),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR (255) NOT NULL
);

CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL,
  subject VARCHAR (255) NOT NULL,
  body TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (author_id) REFERENCES accounts(id)
);

CREATE TABLE article_contributors (
  id BIGSERIAL PRIMARY KEY,
  article_id INTEGER NOT NULL,
  contributor_id INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (contributor_id) REFERENCES accounts(id)
);

CREATE TABLE article_tags (
  article_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags (id)
);

CREATE INDEX on tags (id);
CREATE INDEX on categories (id);
