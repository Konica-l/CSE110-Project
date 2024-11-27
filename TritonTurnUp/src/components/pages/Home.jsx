import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Event from '../carousel/Event';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Error parsing stored user:', err);
      }
    }
  }, []);
  
  useEffect(() => {
    if (user && user.sub) {
      fetchEventsSub();
    }
    if (!user) {
      fetchEvents();
    }
  }, [user]);
  
  const fetchEventsSub = async () => {
    try {
      const url = `http://127.0.0.1:5000/customer/available_events/${user.sub}`;
      const response = await fetch(url);
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

  const fetchEvents = async () => {
    try {
      const url = `http://127.0.0.1:5000/customer/available_events/`;
      const response = await fetch(url);
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


  const handleNext = () => {
    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      {error && <div className="error-message">{error}</div>}
      <div className="carousel">
        <button
          className="prev"
          onClick={handlePrev}
          disabled={currentIndex === 0 || events.length === 0}
        >
          Prev
        </button>

        {events.length > 0 ? (
          <Event
            title={events[currentIndex].title}
            date={events[currentIndex].date_time}
            text={events[currentIndex].preview}
            img={events[currentIndex].image}
            tags={events[currentIndex].tags}
            notInterested={handleNext}
          />
        ) : (
          <div className="no-events">No events to display</div>
        )}

        <button
          className="next"
          onClick={handleNext}
          disabled={currentIndex === events.length - 1 || events.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
