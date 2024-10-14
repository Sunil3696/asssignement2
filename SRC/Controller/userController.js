/**
 * File: userController.js
 * Student Name: Kanchandeep Kaur
 * Student ID: 200603165
 * Date: 13-10-24
 */
const User = require("../Models/userModel");


const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }

  const user = new User({ email, password, username });
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occured");
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(401).json({ message: "All fields are required" });
        return;
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isPasswordValid = await user.isValidPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.session.userId = user._id;
      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occured");
    }
  };

  const logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out user" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  };

  module.exports = { registerUser, loginUser, logoutUser };