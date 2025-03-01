const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");

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
    const images = await Image.find({});

    if (images) {
      return res.status(200).json({
        success: true,
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

// const deleteImageControlller = async (req, res) => {
//   try {
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Some error occured! Please try again!",
//     });
//   }
// };

module.exports = {
  uploadImageController,
  fetchImagesController,
};
