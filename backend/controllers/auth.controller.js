import {compareSync, hashSync} from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {connectDB} from "../config/db.js";
import Login from "../models/login.model.js";
import User from "../models/user.model.js";
import {JWT_SECRET} from "../secrets.js";

export const signup = async (req, res) => {
	console.log(req.body);

	try {
		await connectDB();

		const userData = await User.findOne({email: req.body.email});

		if (userData) {
			res.status(400).json({
				success: false,
				message: "A user with this email already exists",
			});
			return;
		}

		const newUser = await User.create({
			...req.body,
			password: hashSync(req.body.password, 10),
		});

		//JWT JSON web token
		const token = jwt.sign({id: newUser._id, email: newUser.email}, JWT_SECRET, {expiresIn: "2h"});

		res.cookie("authToken", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 60 * 60 * 2000, // 2 hours (in milliseconds)
		});

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			// user: newUser,
		});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Server Error", error: error.message});
		return;
	}
};

export const login = async (req, res) => {
	const {email, password: user_password} = req.body;

	try {
		await connectDB();

		const user = await User.findOne({email}).lean();

		// delete user.password;

		// .populate("favs");

		if (!user) {
			res.status(404).json({success: false, message: "Invalid Credentials"});
			return;
		}

		if (!compareSync(user_password, user.password)) {
			res.status(401).json({success: false, message: "Invalid Credentials"});
			return;
		}

		await Login.create({user_id: user._id, username: user.username});

		const {password, updatedAt, __v, ...data} = user;

		console.log(user);
		const token = jwt.sign({id: user._id, email: user.email}, JWT_SECRET, {
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
	} catch (error) {
		res.status(500).json({success: false, message: "Server Error", error: error.message});
		return;
	}
};

export const logout = async (req, res) => {
	const userId = req.user.id;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		res.status(400).json({success: false, message: "You are not logged in!"});
		return;
	}

	try {
		await connectDB();

		const user = await User.findOne({_id: userId});

		if (!user) {
			res.status(404).json({success: false, message: "User not found"});
			return;
		}
		res.clearCookie("authToken");

		res.status(200).json({success: true, message: "Log out successful"});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Server Error", error: error.message});
	}
};
