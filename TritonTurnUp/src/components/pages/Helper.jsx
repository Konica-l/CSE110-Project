import React from 'react'
import Navbar from '../navbar/Navbar'
import data from '../../event_list.json';

const Helper = () => {
  const ind = getEvent(0);
    return (
      <div>
        <Navbar />
        <h1>Helper</h1>
        <p>{ind.id}</p>
      </div>
    )
  }

export function getEvent(index) { //returns event 
  return (data[index])
}

export default Helper