import { Server } from "socket.io";
import handleLocation from "./handleLocation";

export default async function initializeSocketIo(io: Server) {
  io.use((socket, next) => {
    console.log("Middleware passed");
    next();
  });

  return io.on("connection", async (socket) => {
    console.log("User connected with id ", socket.id);

    handleLocation(io, socket, "lorem_ipsum");
    socket.on("disconnect", () => {
      console.log("User with id ", socket.id, " disconnected");
    });
  });
}
