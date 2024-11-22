import React from 'react';
import './EventPreview.css';

function EventPreview(props){

  return (
    <div className='event-preview'>
        {/* Image */}
        <div className='small-image-crop'>
        <img className='small-image' src={props.img} alt={props.title}/>
        </div>

        {/* Text */}
        <div className='small-text'>
            <p className='small-title'>{props.title}</p>
            <p className='small-date'>{props.date}</p>
            <p className='small-preview'>{props.text}</p>
        </div>
    </div>
  )
}

export default EventPreview