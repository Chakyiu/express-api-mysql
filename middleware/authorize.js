// const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/key");

module.exports = authorize;

function authorize(req, res, next) {
  var token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ message: "Unauthorized" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({ message: "Unauthorized" });
  }
}
