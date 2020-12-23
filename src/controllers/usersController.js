const { check, validationResult } = require('express-validator');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const rules = [
  // checkメソッドを使用してバリデーションを実行
  check('name').not().isEmpty().withMessage('名前は必須です'),
  check('email').not().isEmpty().withMessage('メールは必須です'),
  check('password').not().isEmpty().withMessage('パスワードは必須です'),
  check('password').isLength({ min: 7 }).withMessage('パスワードは７文字以上です'),
  check('password').
    custom((value, { req }) => {
      if (req.body.password === req.body.confirmPassword) {
        return true;
      }
    }).withMessage('パスワードが一致しません。')
]

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = [];
    errors.errors.forEach((error) => {
      messages.push(error.msg);
    });
    res.render('users/signup', { messages: messages })
  }
  next();
}
function signup(req, res) {
  req.session.name = req.body.name;
  db.sequelize.sync()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then(hashedPassword => db.User.create({
      name: req.body.name,
      email: req.body.email,
      pass: hashedPassword
    })).then(usr => {
      res.redirect('/home');
    })
}

function login(req, res) {
  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.redirect("login");
      }
      return user;
    })
    .then((user) => {
      let resultMatch = bcrypt.compareSync(req.body.password, user.pass);
      console.log(resultMatch);
      if (resultMatch) {
        res.redirect("/home");
        console.log("pass:mach")
      }
      res.redirect("login");
    })
}

module.exports =
  { rules, validate, signup, login };
