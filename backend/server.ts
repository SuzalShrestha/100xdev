import app from "./app";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import sequelize from "./app/configs/database";
import userSeeder from "./app/seeders/userSeeders";
import friendSeeder from "./app/seeders/friendSeeder";
import initializeSocketIo from "./app/socket";

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

  initializeSocketIo(io);

  const PORT = process.env.APP_PORT;
  httpServer.listen(PORT, () => {
    console.info(
      `🚀🔥 Server is running on port http://localhost:${PORT} 🔥🚀`
    );
  });
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database has been authenticated");

    await sequelize.sync({ force: false, alter: true });
    console.log("All models were synchronized successfully");

    await userSeeder();

    await friendSeeder();

    initiateServer();
  } catch (error) {
    console.log(error);
    console.log("Server couldn't start due to some error");
    process.exit(1);
  }
})();
