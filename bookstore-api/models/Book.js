const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    maxLength: [100, "Title cannot be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author title is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publication year is required"],
    min: [1950, "Year must be atlest 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date().now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
