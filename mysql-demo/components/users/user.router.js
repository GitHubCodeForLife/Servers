const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const { auth } = require("../auth/auth.services");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/dashboard", auth, UserController.getDashBoard);

module.exports = router;
