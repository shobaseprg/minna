
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  let token = req.headers.authorization;
  console.log(token);
  console.log(req.headers);

  // validate token
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }


  // トークンの検証
  jwt.verify(token, "secretKey", function (err, decoded) {
    if (err) {
      // 認証NGの場合
      next(err.message);
    } else {
      // 認証OKの場合
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = auth;
