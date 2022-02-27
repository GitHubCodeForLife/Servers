const express = require("express");
const router = express.Router();
const busboy = require("busboy");
const { getFileCSVData } = require("./fileCSVServices");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to FoveIT application." });
});

router.post("/", (req, res) => {
  console.log("POST request");
  const fileData = [];
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    //check file name of csv type
    const ext = filename.substring(filename.lastIndexOf(".") + 1);
    if (ext !== "csv") {
      return res.status(400).send("Invalid file type");
    }

    file
      .on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
        fileData.push(data);
      })
      .on("close", () => {
        console.log(`File [${name}] done`);
      });
  });
  bb.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  });
  bb.on("close", () => {
    const file = getFileCSVData(fileData);
    console.log({ file });
    console.log("Done parsing form!");
    res.writeHead(303, { Connection: "close", Location: "/" });
    res.end();
  });
  req.pipe(bb);
});

module.exports = router;
