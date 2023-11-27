// chat.jsx
"use client"
import React, { useState } from 'react';
import { useSocket } from '../providers/socket-provider';

const Chat = ({ channelCode, projectId }) => {
    const { socket, isConnected } = useSocket();
    const [message, setMessage] = useState('');
    const [list, setList] = useState([]);

    const sendMessage = async () => {
        console.log("send message");
    };

    if (isConnected) {
        socket.on("messageChat", (mes) => {
            setList([...list, mes]);
        });
    }
    return (
        <div className="col-span-full">
            <ul className='border p-5 px-8 mt-3 mb-3'
                style={{
                    listStyle: "decimal"
                }}
            >
                {list?.map((item, key) => {
                    return <li key={key}> {item}</li>
                })}
            </ul>
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Form gửi tin nhắn
            </label>
            <div className="mt-2">
                <textarea
                    id="about"
                    name="about"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
            </div>
            <button onClick={()=>sendMessage()} disabled={!isConnected} className="bg-black text-white p-2 rounded mt-1 disabled:opacity-6">
                Send
            </button>
        </div>
    );
};

export default Chat;
