import React, { useState } from 'react'
import './Modal.css'

const Modal = ({onYes, onNo, onClose, children}) => {
  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-header'>
            <p onClick={() => onClose()}>&times;</p>
        </div>
        <div className='modal-content'>
            {children}
        </div>
        <div className='modal-footer'>
            <button onClick={() => onNo()}>No</button>
            <button onClick={() => onYes()}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
