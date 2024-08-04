// import mongoose from 'mongoose';
import mongoose, { Schema } from 'mongoose';


const chatRoomSchema = mongoose.Schema({
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ChatRoom", chatRoomSchema);
