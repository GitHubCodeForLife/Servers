require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db.config");
const bodyParser = require("body-parser");
const TutorialRouter = require("./components/tutorials/tutorial.router");
const UserRouter = require("./components/users/user.router");

db.sync().then(console.log("Syncing Database Done!"));
//create all tables
require("./config/db.tables");
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//api
app.use("/api/tutorials", TutorialRouter);
app.use("/api/users", UserRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
