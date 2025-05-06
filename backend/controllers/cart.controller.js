import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";

export const getCart = async (req, res) => {
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    await connectDB();

    const cart = await Cart.find({ cartowner: userId })
      .populate({ path: "cartowner", select: "email username " })
      .populate({
        path: "product",
        select: "name image price createdAt owner",
        populate: { path: "owner", select: "username" },
      });

    res.status(200).json({
      success: true,
      message: "Fetched products in cart",
      cart,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const AddCart = async (req, res) => {
  const userId = req.user.id;

  const prodId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(prodId)) {
    res.status(400).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
      return;
    }

    console.log(user);

    const prod = await Product.findById(prodId);

    if (!prod) {
      res.status(400).json({ success: false, message: "Product not found" });
      return;
    }

    const inCart = await Cart.findOne({ cartowner: userId, product: prodId });

    if (inCart) {
      res.status(400).json({
        success: false,
        message: "You already added this product to cart.",
      });
      return;
    }

    const newCart = new Cart({ cartowner: userId, product: prodId });
    await newCart.save();

    user.cartedProducts.push(newCart);
    await user.save();

    res.status(200).json({
      success: true,
      message: `${prod.name} added to cart`,
      name: prod.name,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    await connectDB();

    const inCart = await Cart.findOne({ _id: id }).populate({
      path: "product",
      select: "name",
    });

    if (!inCart) {
      res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
      return;
    }

    const prod = await Cart.findByIdAndDelete({ _id: id });

    await User.findByIdAndUpdate(
      inCart.cartowner,
      { $pull: { cartedProducts: inCart._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: prod,
      message: `Removed ${inCart.product.name} from cart`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};

export const allCartedProducts = async (req, res) => {
  try {
    await connectDB();

    const cart = await Cart.find()
      .populate({ path: "cartowner", select: "username email " })
      .populate({ path: "product", select: "name price image createdAt" });

    if (cart.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No products in cart", cart: [] });
    }

    res
      .status(200)
      .json({ success: true, message: "Fetched products in cart", cart });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
};
