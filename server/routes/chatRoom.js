import express from 'express';
import { createChatRoom, joinChatRoom, leaveChatRoom } from '../controller/ChatRoom.js';

const router = express.Router();

router.post('/create', createChatRoom);
router.post('/join/:id', joinChatRoom);
router.post('/leave/:id', leaveChatRoom); // Ensure this route is correctly defined

export default router;
