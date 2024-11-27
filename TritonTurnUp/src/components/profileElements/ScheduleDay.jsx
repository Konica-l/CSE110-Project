import React, { useState } from 'react';
import './ScheduleDay.css';


function ScheduleDay(){

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
                {times.map((time) => {
                    return (
                        <div
                        key={time}
                        className={`time-slot ${selectedSlots.includes(time) ? "selected" : ""}`}
                        onClick={() => toggleSlot(time)}
                        >
                            {time}
                        </div>
                    );
                })}
            </div>
        </div>
    )
    
}
  
export default ScheduleDay