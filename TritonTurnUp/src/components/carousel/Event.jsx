import React, { useState } from 'react';
import './Event.css';
import Modal from './Modal'
import Labels from './Labels'
import rejectImage from '../../assets/X circle.png'
import linkImage from '../../assets/External link.png'
import acceptImage from '../../assets/Check square.png'
import myData from './meEvents.json'

function Event(props){
  // state to toggle confirmation pop-up
  // const [modalOpen, setModalOpen] = useState(false)
  // const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [savedEvents] = useState(myData.events)

  // handler to close pop-up
  // const handleCloseModal = () => {
  //   setModalOpen(false)
  //   setStatusModalOpen(false)
  // }

  // handler to add event to calendar  
  const handleAddEvent = () => {
    // setModalOpen(false)
    // setStatusModalOpen(true)
    if (savedEvents.includes(props)) {
      alert('event already added')
      console.log(savedEvents, 'detect duplicate event')
      return;
    } else {
      alert('event added!')
      savedEvents.push(props)
    }
    console.log(savedEvents)
  }

  return (
    <div className='carousel-card-container'>
      {/* {modalOpen && 
        <Modal 
          onYes={handleAddEvent} 
          onNo={handleCloseModal}
          onClose={handleCloseModal}
        >
          <p>Would you like to add this event to your calendar?</p>
        </Modal>
      }
      {statusModalOpen &&
        <Modal 
        onClose={handleCloseModal}
        showFooter={false}
        >
          <p>Event added.</p>
        </Modal>
      } */}

      <div className='carousel-card'>
        <p className='carousel-card-title'>{props.title}</p>
        <div className='carousel-card-img-crop'>
          <img className='carousel-card-img' src={props.img} alt={props.title}/>
        </div>
        <p className='carousel-card-date'>{props.date}</p>

        <Labels tagsString={props.tags} />

        <p className='carousel-card-preview'>{props.text}</p>
        <div className='carousel-card-buttons'>
          <button onClick={() => props.notInterested()}><img src={rejectImage} alt='Reject'/></button>
          <button><img src={linkImage} alt='More'/></button>
          <button onClick={() => handleAddEvent()}><img src={acceptImage} alt='Accept'/></button>
        </div>
      </div>
    </div>
  )
}

export default Event