const express = require('express');
const router = express.Router();
const { signup, login, logout } = require("../controllers/usersController");
const { rules, validate } = require("../controllers/validateController");

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('users/login');
});

router.post("/login", login);

router.get('/signup', function (req, res, next) {
  let messages = [];
  res.render('users/signup', { messages })
});

router.post('/signup', rules, validate, signup);

router.get('/logout', logout);

module.exports = router;
