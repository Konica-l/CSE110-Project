import React, { useState, useEffect } from 'react';
import EventPreview from './EventPreview';

function EventSummary() {
    const [events, setEvents] = useState([]); // State to hold fetched events
    const [user, setUser] = useState(null);  // State for user data

    // Fetch user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Fetch subscribed events from the server
    useEffect(() => {
        if (user?.sub) {
            fetch(`http://127.0.0.1:5000/customer/subscribed/${user.sub}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch subscribed events.');
                    }
                    return response.json();
                })
                .then((data) => setEvents(data))
                .catch((error) => console.error('Error:', error));
        }
    }, [user?.sub]);

    return (
        <div className='event-summary'>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <EventPreview
                        key={index}
                        title={event.title}
                        date={event.date_time}
                        text={event.preview}
                        img={event.image}
                        id={event.id}
                    />
                ))
            ) : (
                <p>No events scheduled</p>
            )}

        </div>
    );
}

export default EventSummary;
