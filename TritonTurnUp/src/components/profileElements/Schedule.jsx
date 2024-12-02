import React, {useState, useEffect} from "react";
import './Schedule.css';
import Day from "./ScheduleDay.jsx";

function Schedule() {

    const daysOfWeek = ["Time", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    return (

        <div className="calendar">
            <h1>This Week's Availability</h1>
            <div className = "calendar_days_container">
                {daysOfWeek.map((item, index) => (
                    <div key={index}>
                        <h2>{item}</h2>
                        <Day index={index}/>
                    </div>
                ))}
            </div>

            <button className = "update_button"> 
                <h3>Update Schedule </h3>
            </button>

        </div>

    );
};

export default Schedule