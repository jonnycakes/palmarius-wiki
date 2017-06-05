const express = require('express');

const router = express.Router();

const controller = require('./controller');
const catController = require('../categories/controller');
const views = require('./viewController');


// VIEW special routes
router.get('/new', controller.getAllAccounts, catController.index, views.formNew);
router.get('/:id/edit', controller.getAllAccounts, controller.getOneArticle, views.formEdit);

//  VIEW (get) a collection of articles
router.get('/', controller.index, views.showAll);

// VIEW (get) a sindle /article/id
router.get(('/:id(\\d+)/'), controller.show, controller.getEditors, views.showOne)

//  CREATE (post) new article to the collection
router.post('/', controller.create);

// UPDATE (patch) a specific /article/:id
router.put(('/:id(\\d+)/'), controller.update, controller.createArticleEditor, views.updateRedirect);

// DESTROY (delete) an /article/:id
router.delete(('/:id(\\d+)/'), controller.destroyArticleEdits, controller.destroyArticle, views.destroyRedirect);

// VIEW update-history
router.get('/update-history', controller.getUpdateHistory, views.showUpdateHistory);

module.exports = router;
