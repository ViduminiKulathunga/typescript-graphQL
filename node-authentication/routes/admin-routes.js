const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const isAdminMiddleware = require("../middleware/admin-middleware");

router.get("/welcome", authMiddleware, isAdminMiddleware, (req, res) => {
  try {
    return res.status(201).json({
      success: true,
      message: "Welcome to Admin Page",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }
});

module.exports = router;
