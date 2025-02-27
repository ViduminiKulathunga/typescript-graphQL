const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://viduminikulathunga:${process.env.DB_PASSWORD}@cluster0.bc1fm.mongodb.net/`
    );
    console.log("MongoDB is connected successfully");
  } catch (e) {
    console.log("MongoDB connection failed ->", e);
    process.exit(1);
  }
};

module.exports = connectToDB;
