import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "../utils/expressAsyncHandler";
import User from "../models/User";
import ApiError from "../utils/apiError";
import { comparePassword } from "../utils/passwordUtils";
import ApiResponse from "../utils/apiResponse";
import { generateAccessToken } from "../utils/jwtUtils";
import FcmToken from "../models/FcmToken";

const handleSiginIn = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const flag = await comparePassword(password, user.password);
    if (!flag) {
      throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = await generateAccessToken(user);

    // set cookie
    res.cookie("accessToken", `Bearer ${accessToken}`);
    let responseData = {
      accessToken,
      user: user.toJSON(),
    };

    return new ApiResponse(res, 200, "Login Successfull", responseData);
  }
);

const handleLogout = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const dbUser = await User.findOne({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      throw new ApiError(400, "Unauthorized request");
    }

    res.clearCookie("accessToken");
    // delete fcm notifications as well

    return new ApiResponse(res, 200, "Logged out successfully");
  }
);

export { handleSiginIn, handleLogout };
