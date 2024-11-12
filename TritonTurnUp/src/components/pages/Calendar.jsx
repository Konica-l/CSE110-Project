import React, {useState} from 'react'
import Navbar from '../navbar/Navbar'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'


const datesToAddContentTo = [tomorrow, in3Days, in5Days];

const CalendarConstruct = () => {

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
        return 'My content';
      }
    }
  }

  const [value,setValue] = useState(new Date());

  return (
    <div>
      <Navbar />
      <h1>Calendar</h1>
      <div id = "calendar">
        <Calendar
            onChange = {onChange}
            minDate = {new Date(2024, 0,1)}
            maxDate = {new Date(2025, 11,1)}
            minDetail = "year"
            showNeighboringMonth = {false}
            value={date}
            tileContent={tileContent}
          />
      </div>
    </div>
  )
}

export default CalendarConstruct
