import mongoose, { Document, Schema, model } from "mongoose";

export interface ICart extends Document {
  product: mongoose.Types.ObjectId;
  cartowner: mongoose.Types.ObjectId;
}

const CartSchema = new Schema<ICart>({
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

const Cart = mongoose.models.cart || model<ICart>("cart", CartSchema);

export default Cart;
