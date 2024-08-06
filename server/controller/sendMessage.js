import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, senderId } = req.body;
        const newMessage = new Message({
            roomId: id,
            senderId: senderId, 
            text: text
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await Message.find({ roomId: id }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};