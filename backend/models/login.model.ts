import mongoose, { Document, Schema, model } from "mongoose";

export interface ILogin extends Document {
  user_id: mongoose.Types.ObjectId;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
}

const loginSchema = new Schema<ILogin>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.models.login || model<ILogin>("login", loginSchema);

export default Login;
