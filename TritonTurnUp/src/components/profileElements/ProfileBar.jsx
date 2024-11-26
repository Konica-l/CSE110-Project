import React, { useEffect, useState } from 'react';
import './ProfileBar.css';
import EventSummary from '../profileElements/EventSummary';
import defaultUser from '../../assets/defaultUser.jpg';

const ProfileBar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user info from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className='profile'>
            <div className='user'>
                <img
                    className="userimg"
                    src={user?.picture || defaultUser}
                    alt="User Profile"
                />
                <h2 className="heading">{user?.name || "Refresh"}</h2>
            </div>

            <div className='event-summary'>
                <h2 className="heading2">My Events:</h2>
                <EventSummary />
            </div>
        </div>
    );
};

export default ProfileBar;