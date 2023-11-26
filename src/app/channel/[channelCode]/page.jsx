import Link from "next/link";
export default function ChannelDetail({ params }) {
    const { channelCode } = params;
    return (
        <>
            <h1 className="text-center">Danh sách project của channel</h1>
            <div className="flex justify-center align-center flex-wrap pt-3">
                <ul>
                    <li className="mb-3">
                        <Link className="text-white bg-black p-3 rounded inline-block" href={`/channel/${channelCode}/project/001`}>Project 1</Link>
                    </li>
                    <li className="mb-3">
                        <Link className="text-white bg-black p-3 rounded inline-block" href={`/channel/${channelCode}/project/002`}>Project 02</Link>
                    </li>
                    <li>
                        <Link className="text-white bg-black p-3 rounded inline-block" href={`/channel/${channelCode}/project/002`}>Project 03</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}