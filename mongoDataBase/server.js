require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products-route");
const bookRoutes = require("./routes/book-route");

const app = express();

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("Mongo DB connected successfully"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use("/products", productRoutes);
app.use("/reference", bookRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running now on ${port}`);
});
