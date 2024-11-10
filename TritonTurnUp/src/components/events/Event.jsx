import React, { useState} from 'react'
import './Event.css'
import rejectImage from '../../assets/X circle.png';
import linkImage from '../../assets/Link.png';
import acceptImage from '../../assets/Check square.png';

function Event() {
  
    return (

        <div className="event_box">

            <div className = "grid_elements_list">

                <div className = "grid_element">

                    <div className="event_header">
                        <p>
                            Event Title
                        </p>
                    </div>

                </div>

                <div className = "grid_element">

                    <div className="flex_label_list">

                        <div className = "flex_label_item"> Label </div>
                        <div className = "flex_label_item"> Label </div>
                        <div className = "flex_label_item"> Label </div>
                        <div className = "flex_label_item"> Label </div>

                    </div>

                </div>

                <div className = "grid_element">

                    <div className="event_information_box"> 
                        <p>
                            Information about event (is scrollable).
                        </p>
                    </div>

                </div>

                <div className = "grid_element">

                    <img src="https://pbs.twimg.com/media/FgRkpDCXoAED48L.jpg" />

                </div>

                <div className = "grid_element">
                
                    <div className = "flex_button_bar">

                        <button class="flex_button"> 
                            <img src={rejectImage}/>
                        </button>


                        <button className = "flex_button">
                            <img src={acceptImage}/>
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Event;