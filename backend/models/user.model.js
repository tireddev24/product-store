import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
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
      unique: [true, "Username is in use!"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
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

const User = models.User || model("User", UserSchema);

export default User;
