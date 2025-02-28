const express = require("express");
const app = express();

//Middleware
app.use(express.json());

let books = [
  { id: 1, title: "Book 1" },
  { id: 2, title: "Book 2" },
];

//Intro route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api",
  });
});

//get a single book
app.get("/books/:id", (req, res) => {
  const book = books.find((item) => item.id == req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book cannot find. Please try another book!",
    });
  }
});

//Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

//add a new book
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
  };

  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "New book is added successfull!",
  });
});

//update a book
app.put("/update/:id", (req, res) => {
  const findCurrentBook = books.find((book) => book.id == req.params.id);
  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
      message: `Book id ${req.params.id} updated`,
      data: findCurrentBook,
    });
  } else {
    res.status(404).json({
      message: "Book not found!",
    });
  }
});

//delete book
app.delete("/delete/:id", (req, res) => {
  const findIndexOfCurrentBook = books.findIndex(
    (book) => book.id == req.params.id
  );
  if (findIndexOfCurrentBook !== -1) {
    const deleteBook = books.splice(findIndexOfCurrentBook, 1);
    res.status(200).json({
      message: "Book deleted successfully",
      data: deleteBook[0],
    });
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
