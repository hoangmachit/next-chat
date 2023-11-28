'use client';
import SocketIOClient from 'socket.io-client';
import { createContext, useContext, useState, useEffect } from 'react';

const SocketContext = createContext({
    socket: null,
    connected: false
});

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Connect to the socket server
        const socketClient = SocketIOClient('http://localhost:3000', {
            path: '/api/socket/io'
            // Additional options if needed
        });
        setSocket(socketClient);
        // Set the connected state to true when the connection is established
        socketClient.on('connect', () => {
            setConnected(true);
        });

        // Set the connected state to false when the connection is closed
        socketClient.on('disconnect', () => {
            setConnected(false);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socketClient.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket,
                connected
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
