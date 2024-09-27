import app from "./app";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();
const initiateServer = async () => {
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    pingTimeout: 60000,
    connectTimeout: 60000,
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  const PORT = process.env.APP_PORT;
  httpServer.listen(PORT, () => {
    console.info(
      `🚀🔥 Server is running on port http://localhost:${PORT} 🔥🚀`
    );
  });
};

(async () => {
  try {
    initiateServer();
  } catch (error) {
    console.log("Server couldn't start due to some error");
    process.exit(1);
  }
})();
