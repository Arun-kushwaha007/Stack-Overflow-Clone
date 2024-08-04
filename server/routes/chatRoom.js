import express from 'express';
import { createChatRoom, joinChatRoom, leaveChatRoom,fetchMessages,sendMessage } from '../controller/ChatRoom.js';

const router = express.Router();

router.post('/create', createChatRoom);
router.post('/join/:id', joinChatRoom);
router.post('/leave/:id', leaveChatRoom); // Ensure this route is correctly defined
// Fetch messages in a room
router.get('/messages/:id', fetchMessages);

// Send a message
router.post('/message/:id', sendMessage);


export default router;
