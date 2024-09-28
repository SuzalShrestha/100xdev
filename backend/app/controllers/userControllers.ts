import FcmToken from "../models/FcmToken";
import Friend from "../models/Friend";
import Notification from "../models/Notification";
import User from "../models/User";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import expressAsyncHandler from "../utils/expressAsyncHandler";
import { Op } from "sequelize";

// Function to get friend suggestions (users who are not yet friends with the current user)
const getFriendSuggestions = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;

  // Fetch all friends (both userId and relatedUserId) for the current user
  const friends = await Friend.findAll({
    where: {
      [Op.or]: [
        { userId: user.id }, // Friends where current user is userId
        { relatedUserId: user.id }, // Friends where current user is relatedUserId
      ],
    },
  });

  // Create a list of user IDs who are already friends (from both columns)
  const friendIds = friends.map((friend: any) =>
    friend.userId === user.id ? friend.relatedUserId : friend.userId
  );

  // Fetch users that are NOT in the friend list (friendIds) and also exclude the current user
  const suggestedUsers = await User.findAll({
    where: {
      id: {
        [Op.notIn]: [...friendIds, user.id], // Exclude current user and their friends
      },
    },
    attributes: ["fullName", "email", "phone", "gender", "address"],
  });

  return new ApiResponse(
    res,
    200,
    "Successfully fetched friend suggestions",
    suggestedUsers
  );
});

// Function to get the list of current user's friends
const getFriends = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;

  // Find the current user and include their friends
  const userDb = await User.findOne({
    where: { id: user.id },
    include: [
      {
        model: Friend,
        as: "friends", // Friends where user is userId
        include: [
          {
            model: User,
            as: "relatedUser", // Include details of the related user (friend)
            attributes: ["fullName", "email", "phone", "gender", "address"],
          },
        ],
      },
      {
        model: Friend,
        as: "relatedFriends", // Friends where user is relatedUserId
        include: [
          {
            model: User,
            as: "user", // Include details of the original user who initiated friendship
          },
        ],
      },
    ],
    attributes: ["fullName", "email", "phone", "gender", "address"],
  });

  if (!userDb) {
    throw new ApiError(404, "User not found");
  }

  // Format the results by combining friends and relatedFriends into a unified list
  const allFriends = [
    ...userDb.friends.map((friend) => friend.relatedUser), // Friends initiated by user
    ...userDb.relatedFriends.map((friend) => friend.user), // Friends who initiated friendship with the user
  ];

  return new ApiResponse(res, 200, "Successfully fetched friends", allFriends);
});

const createFcmToken = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.body;
  if (!token) throw new ApiError(500, "Bad request");
  const user = req.user;
  const fcm = await FcmToken.findOne({
    where: {
      userId: user.id,
    },
  });
  if (!fcm) {
    await FcmToken.create({
      userId: user.id,
      token,
    });
  } else {
    fcm.token = token;
    await fcm.save();
  }
  return new ApiResponse(res, 201, "FCM token genrated successfully");
});

const getUserNotifications = expressAsyncHandler(async (req, res, next) => {
  const notifications = await Notification.findAll({
    where: {
      userId: req.user.id,
    },
  });

  return new ApiResponse(
    res,
    200,
    "Notifications successfully fetched",
    notifications
  );
});

export { getFriendSuggestions, getFriends, createFcmToken, getUserNotifications };
