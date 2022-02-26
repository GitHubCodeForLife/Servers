const express = require("express");
const router = express.Router();
const UserController = require("./users.controller");
const { auth } = require("../../configs/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/dashboard", auth, UserController.getDashBoard);

module.exports = router;
