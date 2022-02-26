// Auth.js
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  //header bearer token
  console.log(req.headers);
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}

function alreadyAuth(res, res, next) {
  if (req.user) {
    return res.status(401).send("Already authenticated");
  }
  next();
}

module.exports.auth = auth;
