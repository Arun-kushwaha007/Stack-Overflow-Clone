import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Replace with your server URL
const SOCKET_SERVER_URL = 'http://localhost:5000';

const ChatRoom = ({ roomId }) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socketIo = io(SOCKET_SERVER_URL);
        setSocket(socketIo);

        socketIo.emit('joinRoom', roomId);

        socketIo.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketIo.emit('leaveRoom', roomId);
            socketIo.disconnect();
        };
    }, [roomId]);

    const sendMessage = () => {
        if (message.trim()) {
            const messageData = { roomId, text: message, sender: 'user' }; // Adjust sender as needed
            socket.emit('message', messageData);
            setMessage('');
        }
    };

    return (
        <div className="chat-room">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
