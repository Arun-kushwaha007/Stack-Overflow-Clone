
import ChatRoom from "../models/ChatRoom.js";

export const createChatRoom = async (req, res) => {
    try {
        const newRoom = new ChatRoom({
            name: req.body.name,
        });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const joinChatRoom = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: 'Joined room successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const leaveChatRoom = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: 'Left room successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await Message.find({ roomId: id });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        // Saving message to database
        const newMessage = new Message({ roomId: id, text });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
