const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found in the collection",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookDeatilsById = await Book.findById(getCurrentBookId);
    if (!bookDeatilsById) {
      return res.status(404).json({
        success: false,
        message: "No book found in the collection",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: bookDeatilsById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updateBookId = req.params.id;
    const updatedBookFormData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      updateBookId,
      updatedBookFormData,
      {
        new: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "No book found in the collection",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "No book found in the collection",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
