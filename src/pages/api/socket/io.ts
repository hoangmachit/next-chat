import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server as NetServer;
    const io = new ServerIO(httpServer, {
      path: "/api/socket/io",
    });

    io.on('connection', (socket) => {
      console.log(`_____User connected:${socket.id}`);
      // Handle disconnect event
      socket.on('disconnect', () => {
        console.log(`_____User disconnected:${socket.id}`);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};
