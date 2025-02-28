const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }

  //decode this token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Access denied. No token provided. Please Log in",
    });
  }
};

module.exports = authMiddleware;
