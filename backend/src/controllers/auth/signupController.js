const bcrypt = require("bcryptjs");

const { generateJWTtoken } = require("../../lib/utils");
const User = require("../../models/userSchema");

const signupController = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUSer = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUSer) {
      generateJWTtoken(newUSer._id, res);
      await newUSer.save();

      return res.status(201).json({
        _id: newUSer._id,
        email: newUSer.email,
        fullName: newUSer.fullName,
        profilePic: newUSer.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("Error in signupController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = signupController;
