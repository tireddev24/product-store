import { Request, Response } from "express";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Login from "../models/login.model.js";
import { JWT_SECRET } from "../secrets.js";
import { AuthenticatedRequest } from "../middlewares/jwtverify.js";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
      return;
    }

    const userData = await User.findOne({ email });

    if (userData) {
      res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
      return;
    }

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashSync(password, 10),
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 2000, // 2 hours (in milliseconds)
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password: user_password } = req.body;

  try {
    if (!email || !user_password) {
      res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
      return;
    }

    const user = (await User.findOne({ email }).lean()) as any;

    if (!user) {
      res.status(404).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    if (!compareSync(user_password, user.password || "")) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    await Login.create({ user_id: user._id, username: user.username });

    const { password, updatedAt, __v, ...data } = user;

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 2000, // 2 hours (in milliseconds)
    });

    res.status(200).json({
      success: true,
      message: "Logged in",
      user: data,
    });

    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
    return;
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "You are not logged in!" });
    return;
  }

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.clearCookie("authToken");

    res.status(200).json({ success: true, message: "Log out successful" });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
    return;
  }
};
