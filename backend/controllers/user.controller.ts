import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { AuthenticatedRequest } from "../middlewares/jwtverify.js";

export const isUserNameAvailable = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username } = req.body;

  try {
    const data = await User.find().select("username");

    const usernames: string[] = [];
    let i = 0;

    while (i < data.length) {
      usernames.push(data[i].username);
      i++;
    }

    res
      .status(200)
      .json({ success: true, message: "Username available", usernames });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Error", error: error.message });
    return;
  }
};

export const getUser = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json({ success: false, message: "Invalid User Id" });
    return;
  }

  try {
    const user = await User.findById(userId)
      .populate("products")
      .populate("favs");

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to get user" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find({}).select("-password");
    if (!users || users.length === 0) {
      res.status(404).json("No users found");
      return;
    }
    res
      .status(200)
      .json({ success: true, data: users, message: "Users found" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to communicate with server",
    });
    return;
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const { firstname, lastname, username, email } = req.body;
  const updates: any = {};
  if (firstname !== undefined) updates.firstname = firstname;
  if (lastname !== undefined) updates.lastname = lastname;
  if (username !== undefined) updates.username = username;
  if (email !== undefined) updates.email = email;

  if (Object.keys(updates).length === 0) {
    res
      .status(400)
      .json({ success: false, message: "No valid fields to update" });
    return;
  }

  try {
    if (updates.username) {
      const existingUsername = await User.findOne({
        username: updates.username,
        _id: { $ne: userId },
      });
      if (existingUsername) {
        res
          .status(400)
          .json({ success: false, message: "Username is in use!" });
        return;
      }
    }

    if (updates.email) {
      const existingEmail = await User.findOne({
        email: updates.email,
        _id: { $ne: userId },
      });
      if (existingEmail) {
        res
          .status(400)
          .json({ success: false, message: "Email already exists!" });
        return;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Profile updated", user: updatedUser });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
    return;
  }
};
