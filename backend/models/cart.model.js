import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  cartowner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Cart = models.Cart || model("cart", CartSchema);

export default Cart;
