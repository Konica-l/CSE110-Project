import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './Event.css';

const EventPage = () => {
    const [event, setEvent] = useState(null);
    const [error, setError] = useState('');
    const location = useLocation();

    const eventId = new URLSearchParams(location.search).get('id') || '';

    const getEvent = async () => {
        if (!eventId) {
            setError('No event ID provided.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/event/${eventId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch event.');
            }
            const data = await response.json();
            setEvent(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setEvent(null);
        }
    };

    useEffect(() => {
        getEvent();
    }, [eventId]);

    return (
        <div>
            <Navbar />
            <div className="event-container">
                {error ? (
                    <p className="error-message">{error}</p>
                ) : event ? (
                    <div className="event-details">
                        <div className="event-image-container">
                            <img
                                src={event.image_url || 'placeholder.jpg'}
                                alt={event.title}
                                className="event-image"
                            />
                            <div className="event-meta">
                                <p className="event-date">{event.date_time}</p>
                                <br />
                                <p className="event-location">{event.location}</p>
                                <br />
                            </div>
                            {event.tags && event.tags.trim() ? (
                                <div className="tags-container">
                                    {event.tags.split(',').map((tag, index) => (
                                        <span key={index} className="event-tag">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="event-info">
                            <h1 className="event-title">{event.title}</h1>
                            <p className="event-description">{event.description}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading event details...</p>
                )}
            </div>
        </div>
    );
};

export default EventPage;
