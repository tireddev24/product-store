import mongoose, { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  fav?: boolean;
  owner?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    fav: {
      type: Boolean,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Products || model<IProduct>("Products", productSchema);

export default Product;
