import React from 'react'

const Chatlist = ({
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
          chats?.map((data)=>{
              return <div>{data}</div>
          })
      }
  </div>
)
}

export default Chatlist;