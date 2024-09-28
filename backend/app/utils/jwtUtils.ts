const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { Request } from "express";
import User from "../models/User";

dotenv.config();

export const generateToken = ({
  payload,
  expiresIn,
}: {
  payload: object;
  expiresIn: string;
}): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
    issuer: process.env.JWT_ISSUER,
    algorithm: "HS512",
  });

  return token;
};

export const verifyToken = ({
  token,
  ignoreExpiration = false,
}: {
  token: string;
  ignoreExpiration?: boolean;
}) => {
  return jwt.verify(token, process.env.JWT_SECRET, {
    issuer: process.env.JWT_ISSUER,
    algorithms: ["HS512"],
    ignoreExpiration: ignoreExpiration,
  });
};

const generateAccessToken = async (user: User) => {
  const payload = {
    id: user.id,
  };

  const token = generateToken({
    payload,
    expiresIn: process.env.JWT_EXPIRES_IN || "",
  });
  return token;
};


const getAuthToken = (req: Request): string | null => {
  if (
    req &&
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

const getCookieToken = (req: Request): string | null => {
  if (req && req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken.split(" ")[1];
  }

  return null;
};

export { generateAccessToken, getAuthToken, getCookieToken };
