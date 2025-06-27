import mongoose from "mongoose";
import {connectDB} from "../config/db.js";
import Favourite from "../models/fav.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getProducts = async (req, res) => {
	try {
		await connectDB();

		const products = await Product.find({}).populate({path: "owner", select: "username"});
		res.status(200).json({success: true, data: products});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Server Error", error: error.message});
		return;
	}
};

export const getSearchedProduct = async (req, res) => {
	const {id} = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({success: false, message: "Invalid Product Id"});
	}

	try {
		await connectDB();

		const products = await Product.find({_id: id});
		res.status(200).json({success: true, data: products});
		return;
	} catch (error) {
		console.log(`error in fetching searched product`);
		res.status(500).json({success: false, message: "Could not fetch searched data", error: error.message});
		return;
	}
};

export const createProduct = async (req, res) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		res.status(400).json({success: false, message: "Please fill in all fields"});
		return;
	}

	const id = req.user.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Not Authorized"});
		return;
	}

	try {
		await connectDB();

		const user = await User.findById(id);

		if (!user) {
			res.status(404).json({success: false, message: "User not found"});
			return;
		}

		const newProduct = new Product({...product, owner: user._id});
		newProduct.save();

		user.products.push(newProduct);
		await user.save();

		res.status(201).json({
			success: true,
			data: newProduct,
			message: "New Product created!",
		});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Product not created", error: error.message});
		return;
	}
};

export const updateProduct = async (req, res) => {
	const {id} = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({success: false, message: "Invalid Product Id"});
	}

	try {
		await connectDB();

		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		}).populate("owner");
		console.log(updatedProduct);
		res.status(200).json({
			success: true,
			data: updatedProduct,

			message: "Product Details Updated",
		});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Server Error", error: error.message});
		return;
	}
};

export const deleteProduct = async (req, res) => {
	const prodId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(prodId)) {
		return res.status(404).json({success: false, message: "Invalid Product Id"});
	}

	try {
		await connectDB();

		const product = await Product.findById(prodId);

		if (!product) {
			res.status(404).json({success: false, message: "Product does not exist"});
		}

		await Product.findByIdAndDelete(prodId);

		await User.findByIdAndUpdate(product.owner, {$pull: {products: prodId}}, {new: true});

		const isAnyFav = await Favourite.findOne({product: prodId});
		if (isAnyFav) {
			await Favourite.deleteOne({product: prodId});
		}

		res.status(200).json({success: true, message: "Product deleted"});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Product could not be deleted", error: error.message});
		return;
	}
};

export const profileProducts = async (req, res) => {
	const id = req.user.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({success: false, message: "Not Authorized"});
		return;
	}

	try {
		await connectDB();

		const prod = await Product.find({owner: id}).populate({
			path: "owner",
			select: "username firstname lastname favs products cartedProducts email",
		});

		res.status(200).json({
			success: true,
			message: "Successfully fetched products",
			product: prod,
		});
		return;
	} catch (error) {
		res.status(500).json({success: false, message: "Server Error", error: error.message});
		return;
	}
};
