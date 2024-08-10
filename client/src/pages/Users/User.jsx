import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Invite from './Invite';
const User = ({user}) => {
  const location = useLocation();
  return (
   <Link to ={`/Users/${user._id}`} className='user-profile-link'>
    <h3>{user.name.charAt(0).toUpperCase()}</h3>
    <h5>{user.name}</h5>
    {location.pathname ==="/ChatRoom"&& <Invite/>}
   </Link>
  )
}

export default User