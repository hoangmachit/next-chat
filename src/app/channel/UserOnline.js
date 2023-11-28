'use client'
import { useEffect, useState } from 'react';
import { useSocket } from "../../provider/SocketProvider";
export default function UserOnline() {
    const { socket, connected } = useSocket();
    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        if (socket && connected) {
            socket.on('userConnected', (username) => {
                setOnlineUsers((prevUsers) => [...prevUsers, username]);
            });

            socket.on('userDisconnected', (username) => {
                setOnlineUsers((prevUsers) => prevUsers.filter((user) => user !== username));
            });

            return () => {
                socket.off('userConnected');
                socket.off('userDisconnected');
            };
        }
    }, [socket, connected]);

    return (
        <div className="w-70">
            <h2>Online Users:</h2>
            <ul>
                { JSON.stringify(onlineUsers) }
            </ul>
        </div>
    );
}