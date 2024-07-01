import React from 'react';
import './Users.css';
import User from './User';
import { useSelector } from 'react-redux';

// This component is used to display a list of users

const Userslist = () => {
  const users = useSelector((state) => state.usersReducer);
  console.log(users);

  return (
    <div className="users-list-container">
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user) => <User user={user} key={user?._id} />)
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default Userslist;
