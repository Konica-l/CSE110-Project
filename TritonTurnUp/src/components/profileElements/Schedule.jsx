import React from "react";
import './Schedule.css';
import Day from "./ScheduleDay.jsx";


const Schedule = () => {

    const daysOfWeek = ["Time", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    return (

        <div className="calendar">
            <h1>This Week's Availability</h1>
            <div className = "calendar_days_container">
                {daysOfWeek.map((item, index) => (
                    <div>
                        <div key={index}>
                            <h2>{item}</h2>
                            <Day index={index}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Schedule