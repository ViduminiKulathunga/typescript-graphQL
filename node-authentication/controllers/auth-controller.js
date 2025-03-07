const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register controller
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //Check the user is already is exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already exits. Please Log in",
      });
    }

    //Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create a new user
    const newUserCreated = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUserCreated.save();

    if (newUserCreated) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }
};

//login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Check the user is already is exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //Create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      success: true,
      message: "Login Success",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    //extract old and new password;
    const { oldPassword, newPassword } = req.body;

    //find the current user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //If old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is not not correct. Please try again",
      });
    }

    //Hash the new password here
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    //Update user password
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again!",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
