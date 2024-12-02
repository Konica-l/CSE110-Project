import React, { useState} from 'react';
import './ScheduleDay.css';


function ScheduleDay({index, setMatrix, matrix}){

    /*ui stuff*/

    const [selectedSlots, setSelectedSlots] = useState([]);
    const times = ["8am", "9am", "10am","11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm"];

    const updateCell = (row, col, value) => {

        setMatrix((prevMatrix) => {
         
            // Create deep copy of matrix
            const updatedMatrix = prevMatrix.map((r) => [...r]);
            
            // Update the specific cell
            updatedMatrix[row][col] = value;
    
            // Return the updated matrix to update the state
            return updatedMatrix;
        });
        
    };
    

    const toggleSlot = (slot) => {

        const row = times.findIndex(item => item === slot);
        const col = index-1

        if (selectedSlots.includes(slot)) {

            setSelectedSlots(selectedSlots.filter((s) => s !== slot));

            updateCell(row, col, 0);

        } else {

            setSelectedSlots([...selectedSlots, slot]);

            updateCell(row, col, 1);

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