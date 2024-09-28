import { ExtendedError, Server, Socket } from "socket.io";
import handleLocation from "./handleLocation";
import { verifyToken } from "../utils/jwtUtils";
import User from "../models/User";
import SocketRoom from "../models/SocketRoom";
import SocketMembers from "../models/Members";
import Friend from "../models/Friend";
import { Op } from "sequelize";
import FcmToken from "../models/FcmToken";
import { sendNotification } from "../services/notification.services";
import Notification from "../models/Notification";

export default async function initializeSocketIo(io: Server) {
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.token;
    try {
      const decodedToken = verifyToken({ token });
      if (!decodedToken) {
        throw new Error("Invalid token");
      }
      const user = await User.findOne({
        where: {
          id: decodedToken.id,
        },
      });
      if (!user) throw new Error("User not found");
      socket.user = user;
      next();
    } catch (error: any) {
      next(error as ExtendedError);
    }
  });

  return io.on("connection", async (socket) => {
    console.log("User connected with id ", socket.id);
    socket.on("join-room", async () => {
      await SocketRoom.destroy({
        where: {
          userId: socket.user.id,
        },
        force: true,
      });
      let roomId = socket.user.id;
      socket.join(roomId);
      console.log("User is joined to the room ", roomId);
      const room = await SocketRoom.create({
        userId: socket.user.id,
        socketId: socket.id,
      });
      await SocketMembers.create({
        roomId: room.id,
        userId: socket.user.id,
      });
      const friends = await Friend.findAll({
        where: {
          [Op.or]: [
            { userId: socket.user.id }, // Friends where current user is userId
            { relatedUserId: socket.user.id }, // Friends where current user is relatedUserId
          ],
        },
      });
      const friendIds = friends.map((friend) =>
        friend.userId === socket.user.id ? friend.relatedUserId : friend.userId
      );
      const getFcmTokens = async (userIds: number[]): Promise<string[]> => {
        const fcmTokens = await FcmToken.findAll({
          where: {
            userId: {
              [Op.in]: userIds,
              [Op.not]: [socket.user.id],
            },
          },
          attributes: ["token"], // We only need the token field
        });

        // Extract tokens from the result
        const tokens = fcmTokens.map((fcmToken) => fcmToken.token);

        return tokens;
      };

      const friendsFCMTokens = await getFcmTokens(friendIds);
      console.log("Notifications to be sent to ", friendsFCMTokens);
      friendsFCMTokens.map(async (token) => {
        if (!token) return;
        await sendNotification({
          token: token,
          title: `${socket.user.fullName} has shared location with you.`,
          body: "Tap to see the live location.",
          data: {
            link: "NotificationScreen",
            roomId: room.userId,
          },  
        });
      });

      friendIds.map(async (id) => {
        await Notification.create({
          userId: id,
          senderId: socket.user.id,
          title: `${socket.user.fullName} has shared location with you.`,
          body: "Tap to see the live location.",
          data: JSON.stringify({
            link: "NotificationScreen",
            roomId: room.id,
          }),
          deeplink: "NotificationScreen",
        });
      });

      handleLocation(io, socket, roomId);
    });

    socket.on("follow-room", (roomId) => {
      socket.join(roomId);
      console.log(`${socket.user.id} has been connected to room id ${roomId}`);
      handleLocation(io, socket, roomId);
    });

    socket.on("disconnect", () => {
      console.log("User with id ", socket.id, " disconnected");
    });
  });
}
