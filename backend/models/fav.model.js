import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const favSchema = new Schema({
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
});

const Favourite = models.Favourite || model("favourite", favSchema);

export default Favourite;
