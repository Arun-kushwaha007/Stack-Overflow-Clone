import React from 'react'
import Chatitem from '../shared/Chatitem';

const ChatList = ({
    
  chats=[],
  chatId,
  onlineUsers =[],
  newMessagesAlert=[
      {
          chatId:"",
          count:0,
      },
  ],
  handleDeletChat,

}) => {


return (
  
  <div  className=''>
      {
          chats?.map((data,index)=>{

            const {_id, name, groupChat, members}= data;
            const newMessagesAlert = newMessagesAlert.find((alert)=> chatId === _id);

            const isOnline = members?.some((member)=>onlineUsers.includes(_id));
              return <Chatitem
              index={index}  newMessagesAlert={newMessagesAlert}  isOnline={isOnline}
            name={name}
            _id={_id}
            keys={_id}
            groupChat={groupChat}
            sameSender={chatId=== _id}
            handleDeletChatOpen={handleDeletChat}
              />
          })
      }
  </div>
)
}

export default ChatList;