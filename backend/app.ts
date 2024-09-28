import express, { urlencoded } from "express";
import dotenv from "dotenv";
import AllRoutes from "./app/routes";
import errorHandler from "./app/middlewares/errorMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const router = express.Router();

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(router);

app.use("/api", AllRoutes);

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "API is running successfully",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Resources not found",
  });
});

app.use(errorHandler);

export default app;
