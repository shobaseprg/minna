const express = require('express');
const router = express.Router();
const { rules, validate, signup } = require("../controllers/usersController");

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('users/login');
});

router.get('/signup', function (req, res, next) {
  let messages = [];
  res.render('users/signup', { messages: messages })
});

router.post('/signup', rules, validate, signup);

module.exports = router;
