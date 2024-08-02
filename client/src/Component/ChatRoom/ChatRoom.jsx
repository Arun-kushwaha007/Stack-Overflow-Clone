import React, { useState } from 'react';
import axios from 'axios';

const ChatRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);

    const createRoom = async () => {
        const response = await axios.post('/api/chatRoom/create', { name: roomName });
        setRooms([...rooms, response.data]);
        setRoomName('');
    };

    const joinRoom = async (roomId) => {
        await axios.post(`/api/chatRoom/join/${roomId}`);
    };

    const leaveRoom = async (roomId) => {
        await axios.post(`/api/chatRoom/leave/${roomId}`);
        setRooms(rooms.filter(room => room._id !== roomId));
    };

    return (
        <div>
            <input value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Room name" />
            <button onClick={createRoom}>Create Room</button>
            <ul>
                {rooms.map(room => (
                    <li key={room._id}>
                        {room.name}
                        <button onClick={() => joinRoom(room._id)}>Join</button>
                        <button onClick={() => leaveRoom(room._id)}>Leave</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoom;
