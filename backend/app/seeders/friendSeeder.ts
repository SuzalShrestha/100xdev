import { initialUsers } from "../data/usersData";
import Friend from "../models/Friend";
import User from "../models/User";

const shristi = initialUsers.find((s) => s.username === "shristi");
const shristiFriends = initialUsers.filter((f) => f.address === "Kathmandu");

export default async function friendSeeder() {
  const shristiDb = await User.findOne({
    where: {
      username: shristi?.username,
    },
  });
  for (const friend of shristiFriends) {
    const friendDb = await User.findOne({
      where: {
        username: friend.username,
      },
    });
    await Friend.create({
      userId: shristiDb?.id,
      relatedUserId: friendDb?.id,
    });
  }
}
