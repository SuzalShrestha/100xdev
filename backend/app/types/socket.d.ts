import User from "../models/User";

declare module "socket.io" {
    interface Socket {
      user: User;
    }
  }