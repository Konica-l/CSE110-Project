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
        <ProfileBar className = "item1"/>
        <Schedule className = "item2" />
      </div>
    </div>
  )
}

export default Profile