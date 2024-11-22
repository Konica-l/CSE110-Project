import React from 'react'
import './ProfileBar.css';
import EventSummary from '../profileElements/EventSummary'

const ProfileBar = () => {
    return (
        <div className='profile'>
            <h2 className = "heading1"> My Profile:</h2>

            <div className='user'>
                <img className= "userimg" src="https://i.pinimg.com/736x/4c/33/42/4c334214f0a9ea49c2468a23ff5596c0.jpg" />
                <h2 className = "heading">Super Mario</h2>
            </div>

            <div className='event-summary'>
                <h2 className = "heading2"> My Events:</h2>
                <EventSummary />
            </div>
        </div>
    )
}
  
  export default ProfileBar