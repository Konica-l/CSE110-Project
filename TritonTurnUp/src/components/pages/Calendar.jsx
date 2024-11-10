import React from 'react'
import Navbar from '../navbar/Navbar'
import Calendar from 'react-calendar'

const CalendarConstruct = () => {
  return (
    <div>
      <Navbar />
      <h1>Calendar</h1>
      <div id = 'wrap'>
        <Calendar
                    minDate = {new Date(2024, 0,1)}
                    maxDate = {new Date(2025, 11,1)}
                    minDetail = "year"
                    showNeighboringMonth = {false}
          />
      </div>
    </div>
  )
}

export default CalendarConstruct
