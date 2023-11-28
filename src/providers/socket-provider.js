// io-provider.ts
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
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
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API;
    console.log(">>>API", API_URL);
    const socketClient = SocketIOClient.connect(API_URL, {
        path: "/api/socket/io",
    });
    setSocket(socketClient);
    setIsConnected(true);
    return () => {
        socketClient.disconnect();
    };
}, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
