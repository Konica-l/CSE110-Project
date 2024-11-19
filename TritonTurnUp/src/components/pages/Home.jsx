import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Event from '../carousel/Event'
import Data from '../../event_list.json'
import './Home.css'


const Home = () => {
  // State to track the current event index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for the next button
  const handleNext = () => {
    if (currentIndex < Data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handler for the previous button
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className='home-container'>
      <Navbar />
      <div className='carousel'>
        <button className='prev' onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>

        <Event 
          title={Data[currentIndex].title} 
          date={Data[currentIndex].date_time} 
          text={Data[currentIndex].preview} 
          img={Data[currentIndex].image} 
          tags={Data[currentIndex].tags}
          notInterested={handleNext} 
        />

        <button className='next' onClick={handleNext} disabled={currentIndex === Data.length - 1}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Home
