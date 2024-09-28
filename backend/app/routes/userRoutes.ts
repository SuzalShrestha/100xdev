import express from "express";
import { JwtAuthMiddleware } from "../middlewares/jwtMiddleware";
import {
  createFcmToken,
  getFriends,
  getFriendSuggestions,
  getUserNotifications,
} from "../controllers/userControllers";

const router = express.Router();

router.use(JwtAuthMiddleware);

router.route("/friends").get(getFriends);
router.route("/friends-suggestions").get(getFriendSuggestions);
router.route("/create-fcm-token").post(createFcmToken);
router.route("/notifications").get(getUserNotifications);

export default router;
