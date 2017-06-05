const express = require('express');
const controller = require('./controller');
const views = require('./viewController');

const router = express.Router();

// VIEW special routes
router.get('/new', views.formNew);

//  CREATE (post) new category to the collection
router.post('/', controller.create);

//  VIEW (get) a collection of Categories
router.get('/', controller.index, views.showAll);

// VIEW (get) a single Category
router.get(('/:id(\\d+)/'), controller.show, views.showOne);


module.exports = router
