import { Response } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import User, { IUser } from "../models/user.model.js";
import Favourite from "../models/fav.model.js";
import Cart from "../models/cart.model.js";
import { AuthenticatedRequest } from "../middlewares/jwtverify.js";
import { getErrorMessage } from "../utils/helpers.js";

export const getProducts = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find({}).populate({
      path: "owner",
      select: "username",
    });
    res.status(200).json({ success: true, data: products });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: getErrorMessage(error),
    });
    return;
  }
};

export const getSearchedProduct = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    const products = await Product.find({ _id: id });
    res.status(200).json({ success: true, data: products });
    return;
  } catch (error) {
    console.log(`error in fetching searched product`);
    res.status(500).json({
      success: false,
      message: "Could not fetch searched data",
      error: getErrorMessage(error),
    });
    return;
  }
};

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
    return;
  }

  const id = req.user?.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const newProduct = new Product({ ...product, owner: user._id });
    await newProduct.save();

    user.products.push(newProduct._id as mongoose.Types.ObjectId);
    await user.save();

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "New Product created!",
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not created",
      error: getErrorMessage(error),
    });
    return;
  }
};

export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const product = req.body;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    if (existingProduct.owner?.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
      return;
    }

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
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: getErrorMessage(error),
    });
    return;
  }
};

export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const prodId = req.params.id;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(prodId)) {
    res.status(404).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    const product = await Product.findById(prodId);

    if (!product) {
      res
        .status(404)
        .json({ success: false, message: "Product does not exist" });
      return;
    }

    if (product.owner?.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
      return;
    }

    // 1. Delete the product itself
    await Product.findByIdAndDelete(prodId);

    // 2. Pull the product from the owner's list
    await User.findByIdAndUpdate(
      product.owner,
      { $pull: { products: prodId } },
      { new: true },
    );

    // 3. Find and delete all Favourite documents related to this product, and pull from users' list
    const deletedFavs = await Favourite.find({ product: prodId }).select("_id");
    const deletedFavIds = deletedFavs.map((f) => f._id);
    await Favourite.deleteMany({ product: prodId });
    if (deletedFavIds.length > 0) {
      await User.updateMany({}, {
        $pull: { favs: { $in: deletedFavIds } },
      } as mongoose.UpdateQuery<IUser>);
    }

    // 4. Find and delete all Cart documents related to this product, and pull from users' list
    const deletedCarts = await Cart.find({ product: prodId }).select("_id");
    const deletedCartIds = deletedCarts.map((c) => c._id);
    await Cart.deleteMany({ product: prodId });
    if (deletedCartIds.length > 0) {
      await User.updateMany({}, {
        $pull: { cartedProducts: { $in: deletedCartIds } },
      } as mongoose.UpdateQuery<IUser>);
    }

    res.status(200).json({ success: true, message: "Product deleted" });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product could not be deleted",
      error: getErrorMessage(error),
    });
    return;
  }
};

export const profileProducts = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const id = req.user?.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  try {
    const prod = await Product.find({ owner: id }).populate({
      path: "owner",
      select:
        "username firstname lastname favs products cartedProducts email",
    });

    res.status(200).json({
      success: true,
      message: "Successfully fetched products",
      product: prod,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: getErrorMessage(error),
    });
    return;
  }
};
