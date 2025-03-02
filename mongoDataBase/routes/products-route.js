const express = require("express");
const router = express.Router();
const {
  insertSampleProducts,
  getProductsStats,
} = require("../controllers/product-controller");

router.post("/add", insertSampleProducts);
router.get("/get", getProductsStats);

module.exports = router;
