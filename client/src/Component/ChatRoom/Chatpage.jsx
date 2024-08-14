import React from 'react';
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
import ChatRoom from './ChatRoom';
import HeaderChatRoom from './HeaderChatRoom';
import Chatlist from './spec/ChatList';
import "./Chatpage.css"

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

          <Chatlist chats={[1,2,3,4,5]}/>
      </div>
      
    </div>
  );
};

export default ChatPage;
