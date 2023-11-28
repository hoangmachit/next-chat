export default async (req, res) => {
    const { msg } = JSON.parse(req.body);
    !res?.socket?.server?.io.emit('msgChannel', msg);
    return res.status(200).json({ status: true });
}