
const jwt = require('jsonwebtoken');
const env = process.env


const auth = (req, res, next) => {
  const token = (req.session && req.session.token) ? req.session.token : null;

  if (!token) { //トークンがなければ
    res.status(401);
    res.write(JSON.stringify({ status: false, result: 'No token provided.' }, 2, null));
    res.end();
  } else {
    jwt.verify(token, env.SECRET_KEY, function (err) {//トークンが正しいかチェック
      if (err) {
        res.status(401);
        res.write(JSON.stringify({ status: false, result: 'Invalid token.' }, 2, null));
      } else {
        next();
      }
    });
  }
}
module.exports = auth;
