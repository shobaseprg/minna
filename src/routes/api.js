
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  let token = (req.session && req.session.token) ? req.session.token : null;

  if (!token) { //トークンがなければ
    res.status(401);
    res.write(JSON.stringify({ status: false, result: 'No token provided.' }, 2, null));
    res.end();
  } else {
    jwt.verify(token, 'secretKey', function (err, user) {//トークンが正しいかチェック
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
