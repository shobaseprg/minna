const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env

const makeToken = (req, res, user_id) => {
  const payload = { user_id }
  const token = jwt.sign(payload, env.SECRET_KEY, { expiresIn: env.JWT_LIMIT });//第二引数'secretKeyのみ
  req.session.token = token;
  res.redirect('/home');
}

const signup = (req, res) => {
  req.session.name = req.body.name;
  db.sequelize.sync()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then(hashedPassword => db.User.create({
      name: req.body.name,
      email: req.body.email,
      pass: hashedPassword
    })).then(user => makeToken(req, res, user.id));
}

const login = (req, res) => {
  db.User.findOne({ where: { email: req.body.email } })
    .then(inputUser => {
      const resultMatch = bcrypt.compareSync(req.body.password, inputUser.pass);
      if (!inputUser || !resultMatch) {
        return res.redirect("login");
      }
      req.session.name = inputUser.name;
      makeToken(req, res, inputUser.id);
    }
    )
}

const logout = (req, res) => {
  req.session.destroy();
  if (req.session) { res.redirect('/users/logout') };//念のための処理
  res.redirect('/users/login');
}

module.exports =
  { signup, login, logout };
