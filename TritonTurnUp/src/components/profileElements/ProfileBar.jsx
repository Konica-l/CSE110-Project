import React from 'react'
import './ProfileBar.css';
import EventSummary from '../profileElements/EventSummary'

const ProfileBar = () => {
    return (
        <div>
            <h1 className = "heading"> My Profile: </h1>
            <h2 className = "heading">(Username)</h2>
            <img src="https://ih1.redbubble.net/image.5179670953.2221/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" />
            <h2 className = "heading"> My Events:</h2>
            <EventSummary />
        </div>
    )
}
  
  export default ProfileBar