import { cookies } from "next/headers"
import ChatMessage from "../../components/chat/chat-message";
export default function Channel() {
    const cookieList = cookies();
    return (
        <div className="flex justify-center">
            <div className="w-25 ms-3">
                Hello user: {cookieList.get('username')?.value}
            </div>
            <div className="w-70 me-1">
                <ChatMessage />
            </div>
        </div>
    )
}