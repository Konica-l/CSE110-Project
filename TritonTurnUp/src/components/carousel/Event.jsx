import React, { useState, useEffect } from 'react';
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
  const [user, setUser] = useState(null);  // State for user data

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {setUser(JSON.parse(storedUser))};
  }, []);


  // handler to close pop-up
  // const handleCloseModal = () => {
  //   setModalOpen(false)
  //   setStatusModalOpen(false)
  // }

  // handler to add event to user database  
  const handleAddEvent = async () => {
    // setModalOpen(false)
    // setStatusModalOpen(true)

    
    if (!user?.sub) {  //detect if user is not signed in
      alert('You are not signed in to be able to use this feature.')
      return;
    }
    else {
      try {
        const response = await fetch(`http://127.0.0.1:5000/customer/subscribed/new/${user.sub}/${props.id}`, {

        });

        if (!response.ok) throw new Error('Failed to add event.');
    } catch (err) {
        console.error(err);
    }
      alert('event added!')
    }
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