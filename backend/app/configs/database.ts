import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Friend from "../models/Friend";
import SocketRoom from "../models/SocketRoom";
import SocketMembers from "../models/Members";
import Notification from "../models/Notification";
import FcmToken from "../models/FcmToken";
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [User, Friend, SocketRoom, SocketMembers, Notification, FcmToken],
});

export default sequelize;
