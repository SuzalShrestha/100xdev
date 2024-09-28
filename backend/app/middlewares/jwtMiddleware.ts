import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "../utils/expressAsyncHandler";
import { getAuthToken, getCookieToken, verifyToken } from "../utils/jwtUtils";
import ApiError from "../utils/apiError";
import User from "../models/User";

export const JwtAuthMiddleware = expressAsyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Please provide JWT secret key");
  }
  const jwtToken = getCookieToken(req) || getAuthToken(req);
  console.log(jwtToken)
  if (!jwtToken) {
    throw new ApiError(401, "No token provided");
  }
  try {
    const decodedToken = verifyToken({
      token: jwtToken,
    });
    if (!decodedToken) {
      throw new ApiError(401, "Invalid token");
    }
    if (decodedToken.exp > Date.now()) {
      throw new ApiError(401, "JWT Token expired");
    }
    const user: any = await User.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      throw new ApiError(401, "User not found");
    }
    req.user = user;
    return next();
  } catch (error: any) {
    console.log(error);
    throw new ApiError(401, "Token expired");
  }
});
