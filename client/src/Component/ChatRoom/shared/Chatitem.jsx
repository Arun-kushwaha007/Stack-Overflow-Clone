import React from 'react'
import { Link } from 'react-router-dom'

const Chatitem = (
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessagesAlert,
    index=0,
    handleDeleteChat,
    
) => {
  return <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
    <div className="">
    {/* avatar */}
    <div className="">
        <h2>{name}</h2>
        {newMessagesAlert &&(
            <p>{newMessagesAlert.count} New Message</p>
        )}
    </div>
    </div>
  </Link>
}

export default Chatitem