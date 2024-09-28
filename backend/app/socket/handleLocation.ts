import { Server, Socket } from "socket.io";

export default async function handleLocation(
  io: Server,
  socket: Socket,
  roomId: string
) {
  return socket.on("send-coordinates", (coords) => {
    console.log("Location is recieving on roomId = ", roomId);
    if (roomId) {
      // Broadcast the coordinates to other users in the room
      io.to(roomId).emit("receive-coordinates", coords);
      console.log("Location broadcasted");
    }
  });
}
