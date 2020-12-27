const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const makeToken = (req, res, user) => {
  const payload = {
    email: user.email
  }
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
    })).then(user => makeToken(req, res, user));
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
      console.log(user);
      let resultMatch = bcrypt.compareSync(req.body.password, user.pass);
      if (resultMatch) (makeToken(req, res, user));
      return res.redirect("login");
    })
}
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/users/login');
}

module.exports =
  { signup, login, logout };
