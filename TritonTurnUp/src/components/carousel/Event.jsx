import React, { useState } from 'react';
import './Event.css';
import Modal from './Modal'
import Labels from './Labels'
import rejectImage from '../../assets/X circle.png'
import linkImage from '../../assets/External link.png'
import acceptImage from '../../assets/Check square.png'

function Event(props){
  // state to toggle confirmation pop-up
  const [modalOpen, setModalOpen] = useState(false)

 // handler to close pop-up
  const handleModel = () => {
    setModalOpen(false)
  }

  return (
    <div className='event-card-container'>
      {modalOpen && 
        <Modal 
          onYes={handleModel} 
          onNo={handleModel} 
          onClose={handleModel}
        >
          <p>Would you like to add this event to your calendar?</p>
        </Modal>
      }
      
      <div className='event-card'>
        <p className='event-title'>{props.title}</p>
        <div className='event-img-crop'>
          <img className='event-img' src={props.img} alt={props.title}/>
        </div>
        <p className='event-date'>{props.date}</p>

        <Labels tagsString={props.tags} />

        <p className='event-preview'>{props.text}</p>
        <div className='event-buttons'>
          <button onClick={() => props.notInterested()}><img src={rejectImage} alt='Reject'/></button>
          <button><img src={linkImage} alt='More'/></button>
          <button onClick={() => setModalOpen(true)}><img src={acceptImage} alt='Accept'/></button>
        </div>
      </div>
    </div>
  )
}

export default Event