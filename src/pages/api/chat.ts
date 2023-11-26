import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
        const message = req.body;
        res?.socket?.server?.io?.emit("messageChat", message);
        res.status(201).json({});
    }
};
