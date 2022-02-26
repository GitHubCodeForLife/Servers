const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Authentication fail");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}

exports.signJWT = (obj) => {
  const token = jwt.sign({ ...obj }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports.auth = auth;
