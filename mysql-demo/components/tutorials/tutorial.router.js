const express = require("express");
const router = express.Router();
const Tutorial = require("./tutorial.controller");

router.get("/", Tutorial.getAllTutorials);
router.post("/", Tutorial.createNewTuorial);

module.exports = router;
