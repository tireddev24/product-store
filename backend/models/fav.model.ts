import mongoose, { Document, Schema, model } from "mongoose";

export interface IFavourite extends Document {
  favowner: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favSchema = new Schema<IFavourite>(
  {
    favowner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { timestamps: true }
);

const Favourite = mongoose.models.favourite || model<IFavourite>("favourite", favSchema);

export default Favourite;
