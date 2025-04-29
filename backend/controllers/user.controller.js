import User from "../models/user.model.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

export const createUser = async (req, res) => {
  const newUser = req.body;
  const user_name = newUser.email.slice(0, newUser.email.indexOf("@"));
  console.log(user_name);

  const newUserData = new User({ ...newUser, username: user_name });

  console.log(newUserData);

  // return
  try {
    await connectDB();

    const data = await User.findOne({ email: newUserData.email });
    // console.log(data)
    if (data) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists!",
      });
    }

    if (!data) {
      await newUserData.save();
      return res.status(200).json({
        success: true,
        data: newUserData,
        message: "User created successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "User not created!" });
  }
};

export const loginUser = async (req, res) => {
  const { email: user_email, password: user_password } = req.body;

  try {
    await connectDB();

    const userData = await User.findOne({ email: user_email });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
    if (userData.password === user_password) {
      return res
        .status(200)
        .json({ success: true, data: userData, message: "User authorized" });
    } else {
      return res.status(401).json({
        success: false,
        message: "Email or password may be incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const isUserNameAvailable = async (req, res) => {
  const { username } = req.body;

  try {
    await connectDB();

    const data = await User.findOne({ username: username });

    if (data) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already in use!" });
    }
    res.status(200).json({ success: true, message: "Username available" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    return;
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }

  try {
    await connectDB();

    const user = await User.findById(userId)
      .populate("products")
      .populate("favs");

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to get user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    await connectDB();

    const users = await User.find({});
    if (!users) {
      res.status(404).json("No users found");
      return;
    }
    res
      .status(200)
      .json({ success: true, data: users, message: "Users found" });
    return;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to communicate with server" });
    return;
  }
};
