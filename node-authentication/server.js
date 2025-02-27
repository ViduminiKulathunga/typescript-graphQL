require("dotenv").config();
const express = require("express");
const mongoDBConnection = require("./database/db");
const authRoutes = require("./routes/auth-routes");

mongoDBConnection();

const app = express();
const PORT = process.env.PORT || 30000;

//Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listing on ${PORT}`);
});
