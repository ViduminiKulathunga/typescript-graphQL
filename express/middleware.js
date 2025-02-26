const express = require("express");
const app = express();

//define middleware function
const myMiddleware = (req, res, next) => {
  console.log("This middleware run for every request");

  next();
};

app.use(myMiddleware);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.listen(3000, () => {
  console.log(`Server is running now on port 3000`);
});
