const express = require('express');
const controller = require('./controller');
const views = require('./viewController');

const router = express.Router();


//  VIEW (get) a collection of Categories
router.get('/', controller.index, views.showAll);
router.get('/:id', controller.show, views.showOne);

module.exports = router