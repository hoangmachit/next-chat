import Link from "next/link";
import Chat from "../../../../../components/Chat";
export default function projectDetail({ params }) {
    const { channelCode, projectId } = params;
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