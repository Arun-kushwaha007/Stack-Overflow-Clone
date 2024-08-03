
import ChatRoom from "../models/ChatRoom";

export const createChatRoom = async (req, res) => {
    console.log("Request received to create chat room:", req.body);
    try {
        const { name } = req.body;
        const chatRoom = new ChatRoom({ name, users: [req.user._id] });
        await chatRoom.save();
        res.status(201).json(chatRoom);
    } catch (error) {
        console.error("Error creating chat room:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const joinChatRoom = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findById(req.params.id);
        if (chatRoom) {
            chatRoom.users.push(req.user._id);
            await chatRoom.save();
            res.status(200).json(chatRoom);
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const leaveChatRoom = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findById(req.params.id);
        if (chatRoom) {
            chatRoom.users = chatRoom.users.filter(user => user.toString() !== req.user._id.toString());
            if (chatRoom.users.length === 0) {
                await chatRoom.remove();
            } else {
                await chatRoom.save();
            }
            res.status(200).json({ message: 'Left the chat room' });
        } else {
            res.status(404).json({ error: 'Chat room not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
