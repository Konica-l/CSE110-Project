import React, {useState, useEffect} from "react";
import './Schedule.css';
import Day from "./ScheduleDay.jsx";

function Schedule() {

    const daysOfWeek = ["Time", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];


    /*Fetching user's events for today*/

    const [availableEvents, setAvailableEvents] = useState([]);
    const [customerId, setCustomerId] = useState(null);

    // Clear time conflicts for customer:
    const clearTimeConflicts = async (customerId) => {

        try {

            const response = await fetch(`http://localhost:5000/customer/conflicts/clear/${customerId}`);

            if (!response.ok) {

                throw new Error('Failed to clear time conflicts');

            }

            const data = await response.json();

            // Display success message: 

            alert(data.message);  

        } catch (error) {

            alert('Error clearing time conflicts');
            console.error(error);

        }


    };

    // Get events to add for customer:
    const fetchAvailableEvents = async (customerId) => {

        try {

            //Clear time conflicts:
            await clearTimeConflicts(customerId);

            // Fetch available events:
            const response = await fetch(`http://localhost:5000/customer/available_events/${customerId}`);

            if (!response.ok) {

                throw new Error('Failed to fetch available events');

            }

            const data = await response.json();

            setAvailableEvents(data);

        } catch (error) {

            console.error('Error fetching available events:', error);

        }

    };

    useEffect(() => {

        const storedUser = localStorage.getItem('user');

        if (storedUser) {

            const user = JSON.parse(storedUser);
            setCustomerId(user.customer_id);

        } else {
    
            console.log("Customer ID is not available.");
            
        }

    }, []);

    useEffect(() => {

        if (customerId) {  // Only fetch events if the customerId is available

            fetchAvailableEvents(customerId);
            console.log("Success!!!");

        }

    }, [customerId]);
  
  

    return (

        <div className="calendar">
            <h1>This Week's Availability</h1>
            <div className = "calendar_days_container">
                {daysOfWeek.map((item, index) => (
                    <div key={index}>
                        <h2>{item}</h2>
                        <Day index={index}/>




                        {/* This section is just for checking whether or not it works!!!!! */}
                        {availableEvents.length > 0 ? (
                            availableEvents.map((event, eventIndex) => (
                                <div key={eventIndex}>
                                    <p>{event.name}</p> {/* Example, adjust based on your data */}
                                </div>
                            ))
                        ) : (
                            <p> None</p>
                        )}





                    </div>
                ))}
            </div>
        </div>

    );
};

export default Schedule