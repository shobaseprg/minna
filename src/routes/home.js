const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('home', { name: req.session.name });
});

module.exports = router;
