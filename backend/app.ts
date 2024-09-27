import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const router = express.Router();

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

export default app;
