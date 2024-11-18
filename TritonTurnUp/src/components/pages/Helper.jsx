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
  let obj = data.find(x => x.id === id);
  if (obj.id === id) {
    return data[data.indexOf(obj)];
  }
  return console.error("id does not exist");
}

export function tagLookUp(tags) {
  const similar = 0;
  var eventByTag = [];
  for (var i = 0; i < data.length; i++) {
    
  }
}


export default Helper