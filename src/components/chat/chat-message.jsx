'use client'

import { useEffect, useState } from "react"
import { useSocket } from "../../provider/SocketProvider";
export default function ChatMessage() {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const { socket, connected } = useSocket();
    useEffect(() => {
        const getMessage = async () => {
            setMessages([...messages, { user: "Hoang Mach Van", msg: "Hello User" }]);
        }
        if (socket) {
            getMessage();
            socket.on('msgChannel', (msg) => {
                setMessages(prevMessages => [...prevMessages, { user: "End user", msg: msg }]);
            })
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
            <ul>
                {messages?.map((item, key) => {
                    return <li key={key}>
                        {item.msg}
                    </li>
                })}
            </ul>

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