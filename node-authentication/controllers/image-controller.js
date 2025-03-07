const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
  try {
    //Check if the file is missing in the req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required! Please upload an image",
      });
    }

    //Upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //Store the image url and publicId in database
    const newUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newUploadedImage.save();

    //Delete the file from local storage
    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newUploadedImage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

    if (images) {
      return res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        data: images,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }
};

const deleteImageControlller = async (req, res) => {
  try {
    const getCurrentImageId = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getCurrentImageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    //Check if the image is uploaded by the currenr user
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image.",
      });
    }

    //delete the image. first from cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    //delete the image from mongoDB
    await Image.findByIdAndDelete(getCurrentImageId);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageControlller,
};
