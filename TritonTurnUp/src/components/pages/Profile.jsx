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
/* "react-router-dom": "^6.27.0",*/
export default Profile