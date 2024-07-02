import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
import Avatar from '../../Component/Avatar/Avatar';
import Editprofileform from './Editprofileform';
import Profilebio from './Profilebio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons';
import { fetchallusers } from '../../action/users';

const Userprofile = ({ slideIn }) => {
    const { id } = useParams();
    const [Switch, setSwitch] = useState(false);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer || []);
    const currentuser = useSelector((state) => state.currentuserreducer);

    useEffect(() => {
        dispatch(fetchallusers());
    }, [dispatch]);

    useEffect(() => {
        console.log('Users:', users);
        console.log('Type of users:', typeof users);
        console.log('Is array:', Array.isArray(users));
    }, [users]);

    const currentprofile = Array.isArray(users) ? users.find((user) => user._id === id) : null;

    useEffect(() => {
        console.log('Current Profile:', currentprofile);
    }, [currentprofile]);

    if (users.length === 0) {
        return <div>Loading...</div>; // Show a loading indicator while data is being fetched
    }

    return (
        <div className="home-container-1">
            <Leftsidebar slideIn={slideIn} />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">
                                {currentprofile?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentprofile?.name}</h1>
                                <p>
                                    <FontAwesomeIcon icon={faBirthdayCake} />
                                    Joined {moment(currentprofile?.joinedon).fromNow()}
                                </p>
                            </div>
                        </div>
                        {currentuser?.result?._id === id && (
                            <button className="edit-profile-btn" type="button" onClick={() => setSwitch(true)}>
                                <FontAwesomeIcon icon={faPen} /> Edit Profile
                            </button>
                        )}
                    </div>
                    <>
                        {Switch ? (
                            <Editprofileform currentuser={currentuser} setSwitch={setSwitch} />
                        ) : (
                            <Profilebio currentprofile={currentprofile} />
                        )}
                    </>
                </section>
            </div>
        </div>
    );
};

export default Userprofile;
