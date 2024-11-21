import React from 'react';
import './Schedule.css';
import Day from "./ScheduleDay.jsx";

function Schedule(){

    return (
        
        <div>
            <h1 className = "heading">My schedule: </h1>
            <div className = "dayContainer">
                <Day> Monday</Day>
                <Day>Tuesday</Day>
                <Day>Wednesday</Day>
                <Day>Thursday</Day>
                <Day>Friday</Day>
                <Day>Saturday</Day>
                <Day>Sunday</Day>
            </div>

        </div>
    
    )

}
  
export default Schedule