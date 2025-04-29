import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcryptjs";
import { connectDB } from "../config/db.js";
import { JWT_SECRET } from "../secrets.js";

export const signup = async (req, res) => {
  try {
    await connectDB();

    const userData = await User.findOne({ email: req.body.email });

    if (userData) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const newUser = await User.create({
      ...req.body,
      password: hashSync(req.body.password, 10),
    });

    //JWT JSON web token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET
    );

    //remove unwanted fields

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password: user_password } = req.body;

  try {
    await connectDB();

    const user = await User.findOne({ email }).populate("favs");

    if (!user) {
      res.status(404).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    if (!compareSync(user_password, user.password)) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }
    //remove unwanted fields

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "6000s",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // Or 'lax', depending on your needs,
      maxAge: 60 * 60 * 2000, // 1 hour (in milliseconds)
    });

    res.status(200).json({
      success: true,
      token,
      message: "Logged in",
      user,
    });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};
