import { Server } from "socket.io";
export const config = {
    api: {
        bodyParser: false
    }
}

export default (req, res) => {
    if (!res?.socket?.server?.io) {
        console.log(">>Start socket io");
        const httpServer = res.socket.server;
        const socketIo = new Server(httpServer, {
            path: '/api/socket/io'
        });
        socketIo.on('connection', (socket) => {
            socketIo.emit('userConnected', { username: socket.id });
        });
        res.socket.server.io = socketIo;
    }
    res.end();
}