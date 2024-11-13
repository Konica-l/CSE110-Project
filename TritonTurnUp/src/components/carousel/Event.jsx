import React from 'react'
import './Event.css'
import rejectImage from '../../assets/X circle.png'
import linkImage from '../../assets/External link.png'
import acceptImage from '../../assets/Check square.png'

function Event(props){
  return (
    <div className='card'>
      <div className='container'>
        <h1>{props.title}</h1>
        <p className='date'>{props.date}</p>
        <p className='preview'>{props.text}</p>
        <img className='info-img' src={props.img} alt={props.title}/>
        <div className='buttons'>
          <button><img src={rejectImage}/></button>
          <button><img src={linkImage}/></button>
          <button><img src={acceptImage}/></button>
        </div>
      </div>
    </div>
  )
}

export default Event