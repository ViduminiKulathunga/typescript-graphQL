require("dotenv").config();
const express = require("express");
const mongoDBConnection = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const imageRoutes = require("./routes/image-routes");

mongoDBConnection();

const app = express();
const PORT = process.env.PORT || 30000;

//Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listing on ${PORT}`);
});
