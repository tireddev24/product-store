import { Response } from "express";
import mongoose from "mongoose";
import Favourite from "../models/fav.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { AuthenticatedRequest } from "../middlewares/jwtverify.js";
import { getErrorMessage } from "../utils/helpers.js";

export const AddToFavourites = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const prodId = req.params.id;
  const userId = req.user?.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(prodId)) {
    res.status(400).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const productExist = await Product.findOne({ _id: prodId });

    if (!productExist) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }

    const isFav = await Favourite.findOne({
      product: prodId,
      favowner: userId,
    });

    if (isFav) {
      res.status(400).json({
        message: "You already added this product to favourites",
      });
      return;
    }

    const fav = new Favourite({ favowner: userId, product: prodId });
    await fav.save();

    user.favs.push(fav._id as mongoose.Types.ObjectId);
    await user.save();

    const favs = await User.findOne({ _id: userId })
      .select("favs")
      .populate({ path: "favs" });

    res
      .status(201)
      .json({ success: true, message: "Added to favourites!", favs });
    return;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to add to favourites" });
    return;
  }
};

export const removeFromFavourites = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const id = req.params.id;
  const userId = req.user?.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid Product Id" });
    return;
  }

  try {
    const isFav = await Favourite.findOne({ product: id, favowner: userId });

    if (!isFav) {
      res.status(400).json({
        success: false,
        message: "This product is not in favourites ",
      });
      return;
    }

    await Favourite.deleteOne({
      favowner: userId,
      product: id,
    });

    await User.findByIdAndUpdate(
      isFav.favowner,
      { $pull: { favs: isFav._id } },
      { new: true },
    );

    res.status(201).json({ success: true, message: "Removed from favourites!" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: getErrorMessage(error) });
    return;
  }
};

export const getFavourites = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ success: false, message: "Not Authorized" });
    return;
  }

  try {
    const userExists = await User.findById(userId);

    if (!userExists) {
      res.status(400).json({ success: false, message: "User does not exist" });
      return;
    }

    const favs = await User.find({ _id: userId })
      .select("favs")
      .populate({
        path: "favs",
        select: "product",
        populate: {
          path: "product",
          select: "name price image createdAt owner",
          populate: {
            path: "owner",
            select: "username",
          },
        },
      });

    res.status(200).json({ success: true, message: "Fetched favorites", favs });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
    return;
  }
};
