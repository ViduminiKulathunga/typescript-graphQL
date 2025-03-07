const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const isAdminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const {
  uploadImageController,
  fetchImagesController,
  deleteImageControlller,
} = require("../controllers/image-controller");

//Upload the image
router.post(
  "/upload",
  authMiddleware,
  isAdminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);
//Get all images
router.get("/get", authMiddleware, fetchImagesController);
//Delete image
router.delete("/:id", authMiddleware, deleteImageControlller);

module.exports = router;
