import React from 'react'
import './Event.css'

const Labels = ({tagsString}) => {

  if (!tagsString) {

    return <ul className="carousel-card-tags"><li>(No tags available)</li></ul>;

  }

  const tagsArray = tagsString.trim().split(", ").filter(tag => tag);

  return (
    <ul className="carousel-card-tags">
      {tagsArray.map((tag, index) => (
        <li key={index}>{tag}</li>
      ))}
    </ul>
  );

};

export default Labels;

