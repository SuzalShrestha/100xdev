import express from "express";
import AuthRoutes from "./authRoutes";
import UsersRoutes from "./userRoutes";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/users", UsersRoutes);

export default router;
