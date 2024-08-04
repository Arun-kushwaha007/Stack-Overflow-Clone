import React from 'react'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar'
import ChatRoom from './ChatRoom'

const ChatPage = ({slidein}) => {
  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein}/>
      <div className="home-container-2">
        <ChatRoom/>
        
      </div>
    </div>
  )
}

export default ChatPage