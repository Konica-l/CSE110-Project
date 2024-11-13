import React, {useState} from 'react'
import Navbar from '../navbar/Navbar'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'

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

  return (
    <div>
      <Navbar />
      <h1>Calendar</h1>
      <div id = "calendar">
        <Calendar
            minDate = {new Date(2024, 0,1)}
            maxDate = {new Date(2025, 11,1)}
            minDetail = "year"
          />
      </div>
    </div>
  )
}

export default CalendarConstruct
