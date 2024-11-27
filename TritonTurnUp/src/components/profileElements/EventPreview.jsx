import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import linkImage from '../../assets/X circle.png';
import './EventPreview.css';

function EventPreview(props) {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                setIsFadingOut(true);

                const response = await fetch(`http://localhost:5000/customer/subscribed/delete/${props.sub}/${props.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 1100);
                } else {
                    const errorData = await response.json();
                    console.error('Error deleting event:', errorData.message || 'Unknown error');
                    alert('Failed to delete the event. Please try again.');
                    setIsFadingOut(false);
                }
            } catch (error) {
                console.error('Error during delete request:', error);
                alert('An error occurred while deleting the event.');
                setIsFadingOut(false);
            }
        }
    };
    

    if (!isVisible) return null;

    return (
        <div
            className={`event-preview-container ${isFadingOut ? 'fade-out' : ''}`}
        >
            <Link to={`/event?id=${props.id}`} className="event-preview-link">
                <div className="event-preview">
                    <div className="small-image-crop">
                        <img
                            className="small-image"
                            src={props.img}
                            alt={props.title}
                        />
                    </div>
                    <div className="small-text">
                        <p className="small-title">{props.title}</p>
                        <p className="small-date">{props.date}</p>
                        <p className="small-preview">{props.text}</p>
                    </div>
                </div>
            </Link>
            <button
                className="event-delete-button"
                onClick={handleDelete}
            >
                <img src={linkImage} alt="Delete" />
            </button>
        </div>
    );
}

export default EventPreview;
