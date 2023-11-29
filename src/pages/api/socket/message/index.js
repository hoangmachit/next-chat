import { db } from "../../../../lib/db";
export default async (req, res) => {
    const { msg } = JSON.parse(req.body);
    const user = JSON.parse(req.cookies.user);
    const data = await db.mesage.create({
        data: {
            content: msg,
            user_id: user.id
        }
    });
    const message = await db.mesage.findFirst({
        where: {
            id: data.id
        },
        include: {
            user: true
        }
    })
    !res?.socket?.server?.io.emit('msgChannel', message);
    return res.status(200).json({ status: true });
}