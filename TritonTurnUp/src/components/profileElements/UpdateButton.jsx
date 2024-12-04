import React, { useEffect, useState } from 'react';
import './UpdateButton.css';

function FinishButton({ selectedTimeslotMatrix, userSelectedTimes, setUserSelectedTimes }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user info from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const API_BASE_URL = "http://127.0.0.1:5000"; // Local server address

    const transposeMatrix = (matrix) => {
        return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
    };

    const calculatedTime = (day, hour) => {
        if (day === -1) day = 6;
        const hoursBetweenDays = day * 24;
        const hoursOnDay = 8 + hour;
        return (hoursBetweenDays + hoursOnDay) * 60;
    };

    const clearConflicts = async (customerId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/customer/conflicts/clear/${customerId}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log("Cleared conflicts:", data);
        } catch (error) {
            console.error("Error clearing conflicts:", error);
        }
    };

    const addNewConflict = async (customerId, newConflict) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/customer/conflicts/new/${customerId}/${newConflict}`,
                {
                    method: 'GET',
                }
            );
            const data = await response.json();
            console.log("Added conflict:", data);
        } catch (error) {
            console.error("Error adding conflict:", error);
        }
    };

    const handleFinish = async () => {
        if (!user) {
            console.error("User is not logged in.");
            return;
        }

        const customerId = user.sub; // Assuming the user object has a `customer_id` field
        await clearConflicts(customerId); // Clear existing conflicts in the database

        const transposedMatrix = transposeMatrix(selectedTimeslotMatrix);

        for (let i = 0; i < transposedMatrix.length; i++) {
            const indices = [];
            const currentDay = transposedMatrix[i];

            for (let j = 0; j < currentDay.length; j++) {
                if (currentDay[j] === 1) indices.push(j);
            }

            if (indices.length === 0) continue;

            let startFound = false;
            let endFound = false;
            let startTime = 0;
            let endTime = 0;

            for (let j = 0; j < indices.length; j++) {
                if (j === indices.length - 1) {
                    if (!startFound) {
                        startTime = calculatedTime(i - 1, indices[j]);
                        endTime = calculatedTime(i - 1, indices[j] + 1);
                        startFound = true;
                        endFound = true;
                    } else {
                        endTime = calculatedTime(i - 1, indices[j] + 1);
                        endFound = true;
                    }
                } else {
                    if (!startFound) {
                        startTime = calculatedTime(i - 1, indices[j]);
                        startFound = true;
                    }

                    if (indices[j] + 1 !== indices[j + 1]) {
                        endTime = calculatedTime(i - 1, indices[j] + 1);
                        endFound = true;
                    }
                }

                if (startFound && endFound) {
                    const conflict = `${startTime}-${endTime}`;
                    await addNewConflict(customerId, conflict); // Add the conflict to the database
                    startTime = 0;
                    endTime = 0;
                    startFound = false;
                    endFound = false;
                }
            }
        }

        console.log("Finished updating conflicts.");
    };

    return (
        <button className="update_button" onClick={handleFinish}>
            Update Schedule
        </button>
    );
}

export default FinishButton;
