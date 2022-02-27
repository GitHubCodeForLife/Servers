const express = require("express");
const router = express.Router();
const Tutorial = require("./tutorial.controller");
const { auth } = require("../auth/auth.services");

router.get("/", auth, Tutorial.getAllTutorials);
router.post("/", Tutorial.createNewTuorial);

module.exports = router;
