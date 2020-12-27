const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const makeToken = (req, res, user_id) => {
  const payload = { user_id }
  let token = jwt.sign(payload, 'secretKey', { expiresIn: '24h' });//第二引数'secretKeyのみ
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
    .then((user) => {
      if (!user) {
        return res.redirect("login");
      }
      return user;
    })
    .then((user) => {
      let resultMatch = bcrypt.compareSync(req.body.password, user.pass);
      if (resultMatch) {
        req.session.name = user.name;
        makeToken(req, res, user.id);
      };
      return res.redirect("login");
    })
}
const logout = (req, res) => {
  req.session.destroy();
  if (req.session) { res.redirect('/users/logout') };//念のための処理
  res.redirect('/users/login');
}

module.exports =
  { signup, login, logout };
