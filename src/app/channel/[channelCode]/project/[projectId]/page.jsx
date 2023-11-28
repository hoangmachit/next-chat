"use client"
import Link from "next/link";
import { useEffect } from "react";
import Chat from "../../../../../components/Chat";
import { useSocket } from "../../../../../providers/socket-provider";
export default function projectDetail({ params }) {
    const { channelCode, projectId } = params;
    const { socket, isConnected } = useSocket();
    useEffect(() => {
        const emitChannel = async () => {
            await fetch('/api/channel', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        emitChannel();
    }, []);
    useEffect(() => {
        console.log(">>>>isConnected", isConnected);
        if (isConnected) {
            socket.on('channelDetail', (msg) => {
                console.log(">>> hello channel", msg);
            });
        }
    }, [isConnected]);
    return (
        <>
            <div className="p-5">
                <Link className="bg-black p-2 rounded text-white inline-block" href="/channel">Go Channel</Link>
                <h1>Hello project : {channelCode} :: {projectId}</h1>
                <Chat channelCode={channelCode} projectId={projectId} />
            </div>
        </>
    )
}