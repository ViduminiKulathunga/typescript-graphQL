const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://viduminikulathunga:viduminikulathunga2025@cluster0.hy6an.mongodb.net/"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// create user model
const User = mongoose.model("User", userSchema);

async function runQueryExamle() {
  try {
    //create a new document
    const newUser = await User.create({
      name: "Updated Kulathunga",
      email: "updated@gmail.com",
      age: 65,
      isActive: true,
      tags: ["Developer"],
    });

    // //create a new document
    // const newUser = new User({
    //   name: "Saumya Kulathunga",
    //   email: "saumya@gmail.com",
    //   age: 30,
    //   isActive: true,
    //   tags: ["Developer", "Designer", "Manager"],
    // });

    // await newUser.save();

    // console.log("Created new user", newUser);

    // //Get all users
    // const allUsers = await User.find({});

    // const getUserActiveFalse = await User.find({ isActive: false });
    // console.log(getUserActiveFalse);

    // const ageUser = await User.findOne({ age: 30 });
    // console.log(ageUser);

    // const getLastCreatedUserById = await User.findById(newUser._id);
    // console.log(getLastCreatedUserById);

    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields);

    // const limitedUser = await User.find().limit(5).skip(1);
    // console.log(limitedUser);

    // const sortedUser = await User.find({}).sort({ age: -1 }); //decending order -1
    // console.log(sortedUser);

    // const countDocuments = await User.countDocuments({ isActive: false });
    // console.log(countDocuments);

    // const deleteUser = await User.findByIdAndDelete(newUser._id);
    // console.log("Deleted user ->", deleteUser);

    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { email: "Kula@gmail.com", isActive: false },
        $push: { tags: ["updated", "Hello"] },
      },
      { new: true }
    );
    console.log("Updated user ->", updateUser);
  } catch (e) {
    console.log("Error ->", e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamle();
