import mongoose from "mongoose";
import {connectDB} from "../config/db.js";
import User from "../models/user.model.js";

export const isUserNameAvailable = async (req, res) => {
	const {username} = req.body;

	try {
		await connectDB();

		const data = await User.find().select("username");

		const usernames = [];
		let i = 0;

		while (i < data.length) {
			usernames.push(data[i].username);
			i++;
		}

		res.status(200).json({success: true, message: "Username available", usernames});
		return;
	} catch (error) {
		res.status(500).json({message: "Server Error", error: error.message});
		return;
	}
};

export const getUser = async (req, res) => {
	const userId = req.user.id;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return res.status(404).json({success: false, message: "Invalid User Id"});
	}

	try {
		await connectDB();

		const user = await User.findById(userId).populate("products").populate("favs");

		if (!user) {
			res.status(404).json({message: "User not found!"});
		}

		res.status(200).json({user});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Unable to get user"});
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
		res.status(200).json({success: true, data: users, message: "Users found"});
		return;
	} catch (error) {
		console.log(error);
		res.status(500).json({success: false, message: "Unable to communicate with server"});
		return;
	}
};
