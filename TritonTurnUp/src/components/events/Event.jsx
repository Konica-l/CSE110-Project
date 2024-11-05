import React, { useState} from 'react'
import './Event.css'
import rejectImage from './X circle.png';
import linkImage from './Link.png';
import acceptImage from './Check square.png';

function Event() {
  
    return (

        <div className="event_box">

            <div className="event_header">
                <p>
                    Event Title
                </p>
            </div>

            <div className="flex_label_list">
                <div className = "flex_label_item">
                    <div className = "label">Label</div>
                </div>
                <div className = "flex_label_item">
                    <div className = "label">Label</div>
                </div>
                <div className = "flex_label_item">
                    <div className = "label">Label</div>
                </div>
            </div>

            <div className="event_information_box"> 
                <p>Information about event (is scrollable).</p>
            </div>

            <div className="flex_image_list">
                <div className = "flex_image_item">
                    <img src="https://pbs.twimg.com/media/FgRkpDCXoAED48L.jpg" />
                </div>
                <div className = "flex_image_item">
                    <img src="https://pbs.twimg.com/media/FgRkpDCXoAED48L.jpg" />
                </div>
                <div className = "flex_image_item">
                    <img src="https://pbs.twimg.com/media/FgRkpDCXoAED48L.jpg" />
                </div>
                <div className = "flex_image_item">
                    <img src="https://pbs.twimg.com/media/FgRkpDCXoAED48L.jpg" />
                </div>
            </div>

            <div className = "flex_button_bar">
                <div className = "button">
                    <button class="button"> 
                        <img src={rejectImage}/>
                    </button>
                </div>

                <div className = "button">
                    <button class="button"> 
                        <img src={linkImage}/>
                    </button>
                </div>

                <div className = "button">
                    <button class="button"> 
                        <img src={acceptImage}/>
                    </button>
                </div>
            </div>

        </div>


    );

}

export default Event;