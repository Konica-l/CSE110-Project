import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './EventPreview.css';

function EventPreview(props) {
    return (
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
    );
}

export default EventPreview;
