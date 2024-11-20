import React from 'react';
import './Event.css';
import Labels from './Labels'
import rejectImage from '../../assets/X circle.png'
import linkImage from '../../assets/External link.png'
import acceptImage from '../../assets/Check square.png'

function Event(props){

  return (
    <div className='event-card'>
      <div className='event-card-container'>
        <p className='title'>{props.title}</p>
        <div className='img-crop'>
          <img className='img' src={props.img} alt={props.title}/>
        </div>
        <p className='date'>{props.date}</p>

        <Labels tagsString={props.tags} />

        <p className='preview'>{props.text}</p>
        <div className='buttons'>
          <button><img src={rejectImage} alt='Reject'/></button>
          <button><img src={linkImage} alt='More'/></button>
          <button><img src={acceptImage} alt='Accept'/></button>
        </div>
      </div>
    </div>
  )
}

export default Event