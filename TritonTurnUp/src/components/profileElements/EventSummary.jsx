import React from 'react';
import { useState } from 'react';
import EventPreview from './EventPreview';
import Data from '../../event_list.json';

function EventSummary(){

    const [currentIndex, setCurrentIndex] = useState(0);

    return (

        <div className='event-summary'>
            <EventPreview 
            title={Data[currentIndex].title} 
            date={Data[currentIndex].date_time} 
            text={Data[currentIndex].preview} 
            img={Data[currentIndex].image}
            />

            <EventPreview 
            title={Data[1].title} 
            date={Data[1].date_time} 
            text={Data[1].preview} 
            img={Data[1].image}
            />
        </div>

    )

}
  
export default EventSummary