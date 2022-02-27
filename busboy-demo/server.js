require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const FileRouter = require("./file/upload");

const PORT = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// simple route
app.use("/api/file-upload", FileRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FoveIT application." });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
