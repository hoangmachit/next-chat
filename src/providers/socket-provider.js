"use client"
import {
    createContext,
    useEffect,
    useContext,
    useState
} from "react";
import SocketIOClient from "socket.io-client";

const SocketContext = createContext({
    socket: null,
    isConnected: false,
});
export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
}
export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketClient = SocketIOClient.connect('http://localhost:3000', {
            path: "/api/socket/io",
        });
        socketClient.on("connect", () => {
            console.log("SOCKET CONNECTED!", socketClient.id);
            setIsConnected(true);
        });
        setSocket(socketClient);
        return () => {
            socketClient.disconnect();
        };
    }, []);

    return <SocketContext.Provider
        value={{
            socket,
            isConnected
        }}
    >
        {children}
    </SocketContext.Provider>
}