import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT || "8002";
export const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
