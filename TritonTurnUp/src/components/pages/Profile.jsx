import React from 'react'
import Navbar from '../navbar/Navbar'
import Schedule from '../profileElements/Schedule'
import ProfileBar from '../profileElements/ProfileBar'
import Event from '../carousel/Event'
import './Profile.css';
import Login from './Login'

const Profile = ({login, user}) => {
  return (
    <>
      {user ? (
          <div>
            <div className = "pageLayout">
            <ProfileBar className = "item1"/>  
            <Schedule className = "item2" />
            </div>
          </div>
        ) : (
          <>
            <Login login={login} user={user}/>
          </>
        )}
    </>
  )
}

export default Profile