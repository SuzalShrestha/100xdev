import express from "express";
import { handleLogout, handleSiginIn } from "../controllers/authControllers";
import { JwtAuthMiddleware } from "../middlewares/jwtMiddleware";

const router = express.Router();

router.route("/login").post(handleSiginIn);
router.route("/logout").post(JwtAuthMiddleware, handleLogout);

export default router;
