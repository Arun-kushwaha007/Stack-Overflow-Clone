import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatRoom.css';
import User from '../../pages/Users/User';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [joinedRooms, setJoinedRooms] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const users = useSelector((state) => state.usersreducer);
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.currentuserreducer);

  const checkauth = () => {
    if (!user) {
      alert("Login or signup to create a chat room");
      navigate("/Auth");
      return false;
    }
    return true;
  };

  const handleCreateRoom = async () => {
    if (checkauth()) {
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
    }
  };

  const handleUserSelect = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
      setSearchValue('');
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chatRoom', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (Array.isArray(response.data)) {
          setRooms(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error.response || error.message);
      }
    };
    
    fetchRooms();
  }, [token]);

  useEffect(() => {
    const fetchJoinedRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chatRoom/joinedRooms', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const roomsMap = response.data.reduce((acc, room) => {
          acc[room._id] = room;
          return acc;
        }, {});
        setJoinedRooms(roomsMap);
      } catch (error) {
        console.error("Error fetching joined rooms:", error.response || error.message);
      }
    };
    fetchJoinedRooms();
  }, [token]);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(user => 
          user.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, users]);

  const joinRoom = async (roomId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/chatRoom/join/${roomId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedRoom(response.data);
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
      setJoinedRooms(prev => {
        const newJoinedRooms = { ...prev };
        delete newJoinedRooms[roomId];
        return newJoinedRooms;
      });
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
        <div className="room-name">
          <input
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
            placeholder="Room name"
          />
          <button onClick={handleCreateRoom}>Create Room</button>
        </div>
        <ul>
          {rooms.map(room => (
            <li key={room._id}>
              {room.name}
              {joinedRooms[room._id] ? (
                <>
                  <button onClick={() => joinRoom(room._id)}>Join</button>
                  <button onClick={() => leaveRoom(room._id)}>Leave</button>
                </>
              ) : (
                <button onClick={() => joinRoom(room._id)}>Join</button>
              )}
            </li>
          ))}
        </ul>
        <div className="search">
          <input 
            placeholder='Search users'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <div className="users">
          <div className="user-list-container">
            {filteredUsers.map((user) => (
              <User
                user={user}
                key={user?._id}
                onSelect={handleUserSelect}
                selectable={true}
              />
            ))}
          </div>
        </div>
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
