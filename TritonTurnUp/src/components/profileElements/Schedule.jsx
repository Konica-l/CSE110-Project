import React, { useState, useEffect, useRef } from "react";
import './Schedule.css';
import Day from "./ScheduleDay.jsx";


const Schedule = () => {

    /*calendar things*/

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentMonth = new Date().getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[currentMonth];
    const currentYear = new Date().getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const blankSpaces = Array.from({ length: firstDayOfMonth }, (_, index) => index + 1);
    const numberOfDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray = Array.from({ length: numberOfDays }, (_, index) => index + 1);

    /*button things*/

    const [visibleIndex, setVisibleIndex] = useState(null); // Track which element is visible

    const handleClick = (index) => {
        setVisibleIndex(visibleIndex === index ? null : index); // Toggle visibility
    };



    
    return (

      <div className="calendar">
        <h1>{currentMonthName}</h1>
        <div className = "calendar_days_container">
            {daysOfWeek.map((item, index) => (
                <div key={index} className = "calendar_days_element">{item}</div>
            ))}
            {blankSpaces.map((item, index) => (
                <div key={index} className="calendar_days_element">  </div>
            ))}

            {daysArray.map((button, index) => (
                <div key={index}>
                    <button onClick={() => handleClick(index)} className={visibleIndex === index ? "active_day_button" : "day_button"}>{button}</button>
                    {visibleIndex === index && (
                        <div className = "schedule_for_day">
                            <Day/>
                        </div>
                    )}
                </div>
            ))}

        </div>
      </div>
    );
};

export default Schedule