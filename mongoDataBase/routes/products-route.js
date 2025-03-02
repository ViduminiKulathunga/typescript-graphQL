const express = require("express");
const router = express.Router();
const {
  insertSampleProducts,
  getProductsStats,
  getProductAnalysis,
} = require("../controllers/product-controller");

router.post("/add", insertSampleProducts);
router.get("/get", getProductsStats);
router.get("/analysis", getProductAnalysis);

module.exports = router;
