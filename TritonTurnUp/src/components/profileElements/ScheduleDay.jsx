import React, { useState} from 'react';
import './ScheduleDay.css';


/*
clear_time_conflicts(customer_id):

This function is used to clear any time conflict information (stored in the time_conflicts field) 
for a specific customer identified by their customer_id.
It retrieves the time_conflicts data, checks if the customer exists, and if so, updates the customer's 
record by clearing the time_conflicts field. It returns a success message if the operation is successful, 
or an error message if the customer doesn't exist.


get_available_events(customer_id=None):

The events are filtered based on whether they overlap with the customer's time conflicts, whether the customer is 
already subscribed to the event, or whether the customer has ignored the event.

*/

function ScheduleDay({index}){

    /*ui stuff*/

    const [selectedSlots, setSelectedSlots] = useState([]);
    const times = ["8am", "9am", "10am","11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm"];

    const toggleSlot = (slot) => {
        if (selectedSlots.includes(slot)) {
            setSelectedSlots(selectedSlots.filter((s) => s !== slot));
        } else {
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    return (
        <div>
            <div className="day_container">
                <div>
                    {index==0 ?
                     
                        times.map((time) => {
                            return (
                                <div
                                    key={time}
                                    className="time"
                                >
                                    <h3>{time}</h3>
                                </div>
                            );
                        })

                    :

                        times.map((time) => {
                            return (
                                <div
                                    key={time}
                                    className={`time-slot ${selectedSlots.includes(time) ? "selected" : ""}`}
                                    onClick={() => toggleSlot(time)}
                                >
                                    <h3> - </h3>
                                </div>
                            );
                        })

                    }
                </div>
            </div>
        </div>
    )
    
}
  
export default ScheduleDay