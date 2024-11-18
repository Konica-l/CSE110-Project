import React, {useState} from 'react'
import Navbar from '../navbar/Navbar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = momentLocalizer(moment)


const CalendarConstruct = (props) => (
    <div>
      <Navbar />
      <h1>Calendar</h1>
      <div id = "calendar">
        <Calendar
            localizer = {localizer}
            //events = {myEventsList}
            startAccessor= "start"
            endAccessor= "end"
            style = {{ height: 800 }}
          />
      </div>
    </div>
)

export default CalendarConstruct
