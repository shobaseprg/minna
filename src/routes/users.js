const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { rules, validate } = require("../controllers/usersController");
console.log(validate);

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('users/login');
});

router.get('/signup', function (req, res, next) {
  let messages = [];
  res.render('users/signup', { messages: messages })
});

router.post('/signup', rules, validate);

module.exports = router;
