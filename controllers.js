// This is my controller TOC. This will point to all the necessary controllers I'll need for my project.

// Requires for express and expresses built in routing
const express = require('express');

const router = express.Router();


router.use('/articles', require('./controllers/articles'));

// redirect main path to /hotels
router.get('/', (req, res) => {
  res.redirect(301, '/articles');
});

module.exports = router;
