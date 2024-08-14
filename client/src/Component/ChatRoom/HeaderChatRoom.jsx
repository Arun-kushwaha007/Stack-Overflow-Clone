import React, { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const HeaderChatRoom = () => {

    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const navigate = useNavigate();
    const NotificationDialog = lazy(()=> import("./spec/Notification"))
    const NewGroupDialog = lazy(()=> import("./spec/NewGroup"));

    const openNewGroup = ()=>{
        setIsNewGroup((prev)=> !prev);
        console.log("open new group")
    }

    const openNotification = ()=>{
        setIsNotification((prev)=>!prev);
        console.log("open notification")
    }
    
    const navigateGroup = ()=>{
        console.log("navigate to group")
        navigate("/chatroom/group")

    }

  return (
    <>
        <div className="nav">
            <div title='New Group'>
                <button onClick={openNewGroup}>group</button>
            </div>
            <div title='Go to Group'>
                <button onClick={navigateGroup}>Navigate</button>
    </div>
    <div title='Notification'>
                <button onClick={openNotification}>notification</button>
    </div>

    

        </div>
        

            {isNewGroup && (
        
            <NotificationDialog/>

            )}

{isNewGroup && (
      
            <NewGroupDialog/>
     
            )}
    </>
  )
}

export default HeaderChatRoom