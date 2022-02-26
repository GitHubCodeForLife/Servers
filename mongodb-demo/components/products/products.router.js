const express = require("express");
const router = express.Router();
const productController = require("./products.controller");

router.get("/test", (req, res) => {
  res.send("test");
});

router.get("/", productController.queryAllProducts);
router.put("/", productController.updateProducts);
router.post("/", productController.addProducts);
module.exports = router;
