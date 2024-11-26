import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './EventPage.css';

const EventPage = () => {
    const [event, setEvent] = useState(null);
    const [user, setUser] = useState(null); // To track the logged-in user
    const [isEventAdded, setIsEventAdded] = useState(false); // Track if the event was added successfully
    const location = useLocation();

    const eventId = new URLSearchParams(location.search).get('id') || '';

    const getEvent = async () => {
        if (!eventId) return;

        try {
            const response = await fetch(`http://127.0.0.1:5000/event/${eventId}`);
            if (!response.ok) throw new Error('Failed to fetch event.');
            const data = await response.json();
            setEvent(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        getEvent();
    }, [eventId]);

    const handleAddEvent = async () => {
        if (!user?.sub || !eventId) return;

        try {
            const response = await fetch(`http://127.0.0.1:5000/customer/subscribed/new/${user.sub}/${eventId}`, {

            });

            if (!response.ok) throw new Error('Failed to add event.');

            setIsEventAdded(true); // Update the state to indicate the event has been added
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="event-container">
                {event ? (
                    <div className="event-details">
                        <div className="event-image-container">
                            <img
                                src={event.image_url || 'placeholder.jpg'}
                                alt={event.title}
                                className="event-image"
                            />
                            <div className="event-meta">
                                <p className="event-date">{event.date_time}</p>
                                <p className="event-location">{event.location}</p>
                            </div>
                            {event.tags && event.tags.trim() && (
                                <div className="tags-container">
                                    {event.tags.split(',').map((tag, index) => (
                                        <span key={index} className="event-tag">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <button
                                className="add-event-button"
                                onClick={handleAddEvent}
                                disabled={isEventAdded} // Disable the button after adding the event
                            >
                                {isEventAdded ? 'Event Added' : 'Add Event to Schedule'}
                            </button>
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
