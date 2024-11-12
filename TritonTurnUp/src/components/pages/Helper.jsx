import React from 'react'
import Navbar from '../navbar/Navbar'
import data from '../../event_list.json';

const Helper = () => {
    const Event = getEventByID("ea4b76321377e2961e4afc6825b36169");
    return (
      <div>
        <Navbar />
        <h1>Helper</h1>
        <p>{Event.id}</p>
        <img src = {Event.image}></img>
      </div>
    )
  }

export function getEventByID(id) { //returns event 
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    }
  } 
  return console.error("id does not exist");
}

export function tagLookUp(tags) {
  const similar = 0;
  
  
}


export default Helper