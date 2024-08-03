// import express from 'express';

import { createChatRoom,joinChatRoom,leaveChatRoom } from '../controller/ChatRoom.js';

import auth from '../middleware/auth.js';

const router=express.Router();

router.post('/create', auth, createChatRoom);
router.post('/join/:id', auth, joinChatRoom);
router.post('/leave/:id', auth, leaveChatRoom);

export default router;
