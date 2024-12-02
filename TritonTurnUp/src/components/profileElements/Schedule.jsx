import React, {useState, useEffect} from "react";
import './Schedule.css';
import Day from "./ScheduleDay.jsx";
import Button from "./UpdateButton.jsx";

function Schedule() {

    const daysOfWeek = ["Time", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const [userSelectedTimes, setUserSelectedTimes] = useState([]);

    const [matrix, setMatrix] = useState(
        Array.from({ length: 15 }, () => Array(7).fill(0))
    );

    return (

        <div className="calendar">
            <h1>This Week's Availability</h1>
            <div className = "calendar_days_container">
                {daysOfWeek.map((item, index) => (
                    <div key={index}>
                        <h2>{item}</h2>
                        <Day 
                            index={index}
                            setMatrix = {setMatrix}
                            matrix={matrix}
                        />
                    </div>
                ))}
            </div>

            <Button
                selectedTimeslotMatrix ={matrix}
                userSelectedTimes = {userSelectedTimes}
                setUserSelectedTimes = {setUserSelectedTimes}
            />



            {/* The stuff below is just for testing and can be deleted later */}



            <div>
                <ul>
                    {userSelectedTimes.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>


            <div>
                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => (
                        <div
                        key={colIndex}
                        className="cell"
                        onClick={() => toggleSlot(rowIndex, colIndex)} // Toggle cell on click
                        style={{
                            width: '30px',
                            height: '30px',
                            border: '1px solid #ccc',
                            backgroundColor: cell === 1 ? 'blue' : 'white',
                        }}
                        ></div>
                    ))}
                    </div>
                ))}
            </div>

        </div>

    );
};

export default Schedule