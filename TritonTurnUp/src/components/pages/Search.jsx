import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();

    const searchQuery = new URLSearchParams(location.search).get('q') || '';

    const searchEvents = async () => {
        const query = searchQuery ? `/${searchQuery}` : '';
        try {
            const response = await fetch(`http://127.0.0.1:5000/event/search${query}`);
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

    return (
        <>
            <Navbar />
            <div className="events-container">
                {error && <p className="error-message">{error}</p>}
                {events.length > 0 ? (
                    events.map((event) => (
                        <a key={event.id} href={`event?id=${event.id}`} className="events-card">
                            <h2 className="events-title">{event.title}</h2>
                            <img
                                src={event.image || 'placeholder.jpg'}
                                alt="Event"
                                className="event-image"
                            />
                            <p className="events-date">{event.date_time}</p>
                           
                            {event.tags && event.tags.trim() ? (
                                <div className="tags-container">
                                    {event.tags.split(',').map((tag, index) => (
                                        <span key={index} className="event-tag">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                            <p className="events-preview">{event.preview}</p>
                        </a>
                    ))
                ) : (
                    !error && <p>No events found for "{searchQuery}".</p>
                )}
            </div>
        </>
    );
};

export default Search;
