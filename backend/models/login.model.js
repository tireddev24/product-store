import mongoose from "mongoose";

const {Schema, model, models} = mongoose;

const loginSchema = new Schema(
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
			default: new Date(),
		},
	},
	{
		timestamps: true,
	},
);

const Login = models.Login || model("login", loginSchema);

export default Login;
