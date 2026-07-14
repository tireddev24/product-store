import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/root.route.js";
import { FRONTEND_URL, NODE_ENV } from "./secrets.js";
import mongoose from "mongoose";

const createApp = () => {
  const app = express();

  //MIDDLEWARES
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"],
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

  app.get("/ping_dev", (req, res) => {
    res.send("Pong");
  });

  app.get("/ping", async (req, res) => {
  try {
    // 1. Run a lightweight query to keep DB pool alive
    // If using Mongoose/MongoDB:
    await mongoose.connection?.db?.admin().ping();
    
    // If using PostgreSQL/Prisma/SQL:
    // await db.query("SELECT 1");

    console.log("⚡ Database pinged successfully");
    return res.status(200).json({ status: "alive", db: "connected" });
  } catch (error: any) {
    console.error("❌ Ping failed:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
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
