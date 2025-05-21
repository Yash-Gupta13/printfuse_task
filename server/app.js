import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import { connectDBWithRetry, disconnectDB } from "./config/prismaHandler.js";
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.route.js'
import cors from "cors";

config();

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL
    credentials: true, // allow cookies
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/product", productRouter);

(async () => {
  await connectDBWithRetry();

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
})();


process.on("SIGINT", disconnectDB);
process.on("SIGTERM", disconnectDB);