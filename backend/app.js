import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/root.route.js";
import {FRONTEND_URL, NODE_ENV} from "./secrets.js";

const createApp = () => {
	const app = express();

	//MIDDLEWARES
	app.use(express.json());
	app.use(cookieParser());
	app.use(express.urlencoded({extended: true}));
	app.use(
		cors({
			origin: FRONTEND_URL,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		}),
	);

	console.log(FRONTEND_URL);

	if (NODE_ENV === "development") {
		app.use(morgan("dev"));
	}

	//ROUTES
	app.use("/api", router);

	app.get("/ping", (req, res) => {
		res.send("Pong");
	});

	app.all("/*wildcard", (req, res) => {
		res.status(404).json({
			status: "fail",
			message: `${req.method} : ${req.originalUrl} not found.`,
		});
	});

	return app;
};

export default createApp;
