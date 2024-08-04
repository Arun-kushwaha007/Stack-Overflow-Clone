
import ChatRoom from "../models/ChatRoom.js";
// import ChatRoom from '../models/ChatRoom.js';


export const createChatRoom = async (req, res) => {
    try {
        const newRoom = new ChatRoom({
            name: req.body.name,
            // Add other properties as needed
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
        // Add logic to handle joining the room
        res.status(200).json({ message: 'Joined room successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const leaveChatRoom = async (req, res) => {
    try {
        const { id } = req.params;
        // Add logic to handle leaving the room
        res.status(200).json({ message: 'Left room successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

