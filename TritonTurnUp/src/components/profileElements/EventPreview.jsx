import React from 'react';
import './EventPreview.css';

function EventPreview(props){

  return (
    <div className='event-preview'>
        {/* Image */}
        <div className='img-crop'>
        <img className='img' src={props.img} alt={props.title}/>
        </div>

        {/* Text */}
        <div className='text'>
            <p className='title'>{props.title}</p>
            <p className='date'>{props.date}</p>
            <p className='preview'>{props.text}</p>
        </div>
    </div>
  )
}

export default EventPreview