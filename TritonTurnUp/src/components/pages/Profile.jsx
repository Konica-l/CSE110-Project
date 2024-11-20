import React from 'react'
import Navbar from '../navbar/Navbar'
import Schedule from '../profileElements/Schedule'
import ProfileBar from '../profileElements/ProfileBar'
import './Profile.css';

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className = "pageLayout">
        <ProfileBar/>
        <Schedule/>
      </div>
    </div>
  )
}

export default Profile