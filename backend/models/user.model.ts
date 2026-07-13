import mongoose, { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password?: string;
  favs: mongoose.Types.ObjectId[];
  products: mongoose.Types.ObjectId[];
  cartedProducts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favs: [
      {
        type: Schema.Types.ObjectId,
        ref: "favourite",
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    cartedProducts: [{ type: Schema.Types.ObjectId, ref: "cart" }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;
