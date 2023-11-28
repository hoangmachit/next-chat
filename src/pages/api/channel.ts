import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
        res?.socket?.server?.io?.emit("channelDetail", "overthinking");
        res.status(201).json({});
    }
};
