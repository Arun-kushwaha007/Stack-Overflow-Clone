import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatRoom.css'; // Import CSS for styling

const ChatRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const token = localStorage.getItem('token'); // Adjust based on your storage method

    useEffect(() => {
        // Fetch available chat rooms
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/chatRoom', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching chat rooms:", error.response || error.message);
            }
        };
        fetchRooms();
    }, [token]);

    const createRoom = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/chatRoom/create', 
                { name: roomName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRooms([...rooms, response.data]);
            setRoomName('');
        } catch (error) {
            console.error("Error creating room:", error.response || error.message);
        }
    };

    const joinRoom = async (roomId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/chatRoom/join/${roomId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedRoom(response.data);
            // Fetch messages for the selected room
            const messagesResponse = await axios.get(
                `http://localhost:5000/api/chatRoom/messages/${roomId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessages(messagesResponse.data);
        } catch (error) {
            console.error("Error joining room:", error.response || error.message);
        }
    };

    const leaveRoom = async (roomId) => {
        try {
            await axios.post(
                `http://localhost:5000/api/chatRoom/leave/${roomId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (selectedRoom && selectedRoom._id === roomId) {
                setSelectedRoom(null);
                setMessages([]);
            }
        } catch (error) {
            console.error("Error leaving room:", error.response || error.message);
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim() && selectedRoom) {
            try {
                await axios.post(
                    `http://localhost:5000/api/chatRoom/message/${selectedRoom._id}`,
                    { text: newMessage },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMessages([...messages, { text: newMessage, sender: 'You' }]);
                setNewMessage('');
            } catch (error) {
                console.error("Error sending message:", error.response || error.message);
            }
        }
    };

    return (
        <div className="chat-room">
            <div className="room-list">
                <input 
                    value={roomName} 
                    onChange={e => setRoomName(e.target.value)} 
                    placeholder="Room name" 
                />
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
            {selectedRoom && (
                <div className="chat-window">
                    <h2>Chat Room: {selectedRoom.name}</h2>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
