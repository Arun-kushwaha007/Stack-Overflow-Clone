import React from 'react';
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
import ChatRoom from './ChatRoom';
import HeaderChatRoom from './HeaderChatRoom';
import ChatList from './spec/ChatList';
import "./Chatpage.css"
import { sampleChats } from './constants/sampleData';

const ChatPage = ({ slidein }) => {
  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <ChatRoom />
      </div>
      <div className="nav">

        <HeaderChatRoom/>
      </div>
      <div className="main">

          <ChatList chats={sampleChats}/>
      </div>
      
    </div>
  );
};

export default ChatPage;
