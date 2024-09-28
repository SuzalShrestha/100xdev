import * as express from "express";
import User from "../models/UserModel";

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}
