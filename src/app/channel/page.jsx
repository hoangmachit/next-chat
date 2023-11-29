import { cookies } from "next/headers"
import ChatMessage from "../../components/chat/chat-message";
import { db } from "../../lib/db";
import UserOnline from "./UserOnline";
const getAllMessage = async () => {
    return await db.mesage.findMany({
        include: {
            user: true
        }
    });
}
const getAllUser = async () => {
    return await db.user.findMany();
}
export default async function Channel() {
    const cookieList = cookies();
    const user = JSON.parse(cookieList.get('user')?.value);
    const allUser = await getAllUser();
    const allMessage = await getAllMessage();
    return (
        <div className="flex justify-between m-auto mt-3" style={{
            width: 600
        }}>
            <UserOnline allUser={allUser} user={user} />
            <div className="w-70 p-3">
                <ChatMessage allUser={allUser} allMessage={allMessage} user={user} />
            </div>
        </div>
    )
}