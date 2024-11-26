import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Event from '../carousel/Event'
import Data from '../../event_list.json'
import './Home.css'


const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const searchQuery = '';

  const searchEvents = async () => {
    const query = searchQuery ? `/${searchQuery}` : '';
    try {
        const response = await fetch(`http://127.0.0.1:5000/event_search${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch events.');
        }
        const data = await response.json();
        setEvents(data);
        setError('');
    } catch (err) {
        setError(err.message);
        setEvents([]);
    }
  };
  
  // Fetch events whenever the search query changes
  useEffect(() => {
    searchEvents();
  }, [searchQuery]);

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
          Prev
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
