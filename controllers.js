// This is my controller TOC. This will point to all the necessary controllers I'll need for my project.

// Requires for express and expresses built in routing
const express = require('express');

const router = express.Router();

// redirect /articles back to the main url
router.get('/articles', (req, res) => {
  res.redirect(301, '/');
});

router.use('/', require('./controllers/articles'));


module.exports = router;
