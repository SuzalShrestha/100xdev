import { Server, Socket } from "socket.io";

export default async function handleLocation(
  io: Server,
  socket: Socket,
  roomId: string
) {
  socket.on("anythin", () => {});
}
