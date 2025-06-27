import dotenv from "dotenv";

dotenv.config({path: ".env"});

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const FRONTEND_URL = process.env.FRONTEND_URL;
