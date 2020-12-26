const express = require('express');
const router = express.Router();
const { rules, validate, signup, login, logout } = require("../controllers/usersController");

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('users/login');
});

router.post("/login", login);

router.get('/signup', function (req, res, next) {
  res.render('users/signup')
});

router.post('/signup', rules, validate, signup);

router.get('/logout', logout);

module.exports = router;
