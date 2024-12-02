import './UpdateButton.css';

function FinishButton({selectedTimeslotMatrix, userSelectedTimes, setUserSelectedTimes}) {

    // Function to transpose the matrix
    const transposeMatrix = (matrix) => {
        return matrix[0].map((_, colIndex) =>
            matrix.map((row) => row[colIndex])
        );
    };

    // FUnction to calculate the time according to index within matrix:
    const calculatedTime = (day, hour) => {

        //For sunday because it wraps:
        if (day == -1){

            day = 6;

        }

        const hoursBetweenDays = day*24;
        const hoursOnDay = 8+hour;
        const totalTime = (hoursBetweenDays+hoursOnDay)*60;

        return totalTime;

    };
    

    const handleFinish = () => {

        setUserSelectedTimes((prevUserSelectedTimes) => {
         
            // Create deep copy of array:
            const updatedArray = [...prevUserSelectedTimes];

            const transposedMatrix = transposeMatrix(selectedTimeslotMatrix);

            for (let i = 0; i < transposedMatrix.length; i++) {
    
                const indices = [];
                const currentDay = transposedMatrix[i];
    
                for (let j = 0; j < currentDay.length; j++) {
    
                    if (currentDay[j] == 1) {
    
                        indices.push(j);
    
                    }
    
                }
    
                if (indices.length == 0){
    
                    continue;
    
                } else {
    
                    let startFound = false;
                    let endFound = false;
                    let startTime = 0;
                    let endTime = 0;
    
                    for (let j = 0; j < indices.length; j++){
    
                        if (j == indices.length-1){
    
                            if (startFound == false){
    
                                startTime = calculatedTime(i-1, indices[j]);
                                endTime = calculatedTime(i-1, indices[j]+1);
    
                                startFound = true;
                                endFound = true;
    
                            } else {
    
                                endTime = calculatedTime(i-1, indices[j]+1);
                                endFound = true;
    
                            }
    
                        } else {
    
                            if (startFound == false){
    
                                startTime = calculatedTime(i-1, indices[j]);
                                startFound = true;
    
                            }
        
                            if (indices[j]+1 != indices[j+1]){
                            //the next timeslot after indices[j] is not selected (end of a period)
        
                                endTime = calculatedTime(i-1, indices[j]+1);
                                endFound = true;
        
                            }
                            
                        }
    
                        if (startFound == true && endFound == true){
    
                            const string = startTime.toString() + "-" + endTime.toString();
                            updatedArray.push(string);
    
                            startTime = 0;
                            endTime = 0;
                            startFound = false;
                            endFound = false;
    
                        }
        
                    }
    
                }
                
            }

            return updatedArray;

        });

    };

    return (
        <button
            className = "update_button"
            onClick={handleFinish}
        >
            Update Schedule
        </button>
    );
}

export default FinishButton;