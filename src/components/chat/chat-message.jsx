'use client'

import { useEffect, useState } from "react"
import { useSocket } from "../../provider/SocketProvider";
import CircleLoader from "react-spinners/CircleLoader";
export default function ChatMessage({ allUser, user, allMessage }) {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const { socket } = useSocket();
    useEffect(() => {
        setMessages(allMessage);
    }, []);
    useEffect(() => {
        if (socket) {
            socket.on('msgChannel', (message) => {
                setMessages(prevMessages => [...prevMessages, message]);
            });
        }
        return () => {
            if (socket) {
                socket.off('msgChannel');
            }
        };
    }, [socket]);
    const submit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/socket/message', {
            method: "POST",
            body: JSON.stringify({ msg })
        });
        await res.json();
        setMsg("");
    }
    return (
        <div>
            {!messages && <CircleLoader />}
            {messages &&
                <ul>
                    {messages.map((item, key) => {
                        return <li key={key} className={`flex justify-between ${item?.user?.id === user.id ? 'me' : 'you'}`}>
                            <div className="name">
                                {item?.user?.name}
                            </div>
                            <div className="message">
                                {item.content}
                            </div>
                        </li>
                    })}
                </ul>
            }
            <form onSubmit={submit}>
                <div>
                    <input name="message" id="message"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="border border-red p-1 ps-3" />
                </div>
                <div className="mt-1">
                    <button className=" bg-black text-white hover:bg-gray-600 rounded-xl p-2 chat-button">Send</button>
                </div>
            </form>
        </div>
    )
}