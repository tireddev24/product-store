import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/root.route.js";
import { PORT } from "./secrets.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

const corsOptions = {
  // origin: "http://localhost:5173",
  // origin: "https://bp8ntrs2-5173.uks1.devtunnels.ms", 
  origin: "https://my-product-store2.onrender.com"
  credentials: true,
};

//MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());

//ROUTES
app.use("/api", router);

app.get("/", (req, res) => {
  res.send({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
